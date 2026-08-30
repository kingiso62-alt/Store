import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
 if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)
  return NextResponse.json({error:'Unauthorized'},{status:401});

 try{
  const db=supabaseAdmin();
  const now=new Date().toISOString();
  const {data:jobs,error}=await db.from('api_orders')
   .select('*,order_items(id,order_id,player_data)')
   .in('status',['pending','processing'])
   .or(`next_retry_at.is.null,next_retry_at.lte.${now}`)
   .order('created_at')
   .limit(50);
  if(error)throw error;

  const results:any[]=[];
  const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';

  for(const job of jobs||[]){
    let statusResp:any={};
    try{
      const rr=await fetch(`${base}/api/providers/topup/status`,{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({providerOrderId:job.provider_order_id,providerId:job.provider_id})
      });
      statusResp=await rr.json();
    }catch(e:any){
      statusResp={status:'unknown',error:e.message};
    }

    const normalized=String(statusResp.status||'processing').toLowerCase();
    if(['completed','success','successful'].includes(normalized)){
      await db.from('api_orders').update({
        status:'completed',response_payload:statusResp,next_retry_at:null,last_error:null
      }).eq('id',job.id);
      await db.from('orders').update({status:'completed'}).eq('id',job.order_items.order_id);

      if(process.env.INTERNAL_JOB_SECRET){
        try{
          await fetch(`${base}/api/internal/order-status/notify`,{
            method:'POST',
            headers:{'content-type':'application/json','x-internal-secret':process.env.INTERNAL_JOB_SECRET},
            body:JSON.stringify({orderId:job.order_items.order_id,status:'completed'})
          });
        }catch{}
      }
      results.push({id:job.id,status:'completed'});
      continue;
    }

    const attempts=Number(job.attempts||0)+1;
    if(attempts>=3){
      const {data:alts}=await db.from('api_providers')
       .select('*').eq('provider_type','topup').eq('is_active',true)
       .neq('id',job.provider_id).order('priority').limit(1);
      if(alts?.length){
        const fallback=alts[0];
        await db.from('api_orders').update({
          status:'failed',attempts,last_error:'Retry limit reached; fallback created',next_retry_at:null
        }).eq('id',job.id);
        const {data:newJob}=await db.from('api_orders').insert({
          order_item_id:job.order_item_id,
          provider_id:fallback.id,
          provider_order_id:'FB-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),
          status:'processing',
          request_payload:{...(job.request_payload||{}),fallbackFrom:job.id},
          response_payload:{fallback:true},
          attempts:1,
          next_retry_at:new Date(Date.now()+30000).toISOString()
        }).select().single();
        results.push({id:job.id,status:'fallback',newJob:newJob?.id});
      }else{
        await db.from('api_orders').update({
          status:'failed',attempts,last_error:statusResp.error||'Provider failed',next_retry_at:null
        }).eq('id',job.id);
        await db.from('orders').update({status:'failed'}).eq('id',job.order_items.order_id);
        results.push({id:job.id,status:'failed'});
      }
      continue;
    }

    const delay=Math.min(300,30*(2**Math.max(0,attempts-1)));
    await db.from('api_orders').update({
      attempts,
      response_payload:statusResp,
      last_error:statusResp.error||null,
      next_retry_at:new Date(Date.now()+delay*1000).toISOString()
    }).eq('id',job.id);
    results.push({id:job.id,status:'retry',delay});
  }

  return NextResponse.json({processed:results.length,results});
 }catch(e:any){
  return NextResponse.json({error:e.message},{status:500});
 }
}
