import {NextResponse} from 'next/server';import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';
export async function POST(req:Request){
 if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const {apiOrderId}=await req.json();const db=supabaseAdmin();
  const {data:apiOrder,error}=await db.from('api_orders').select('*,order_items(id,order_id,player_data)').eq('id',apiOrderId).single();
  if(error||!apiOrder)return NextResponse.json({error:'API order not found'},{status:404});
  if(apiOrder.status==='completed')return NextResponse.json({ok:true,unchanged:true});
  const attempts=Number(apiOrder.attempts||0);
  if(attempts>=3){
   const {data:alts}=await db.from('api_providers').select('*').eq('provider_type','topup').eq('is_active',true).neq('id',apiOrder.provider_id).order('priority').limit(1);
   if(!alts?.length){await db.from('api_orders').update({status:'failed'}).eq('id',apiOrder.id);return NextResponse.json({error:'No fallback provider available'},{status:409});}
   const alt=alts[0];
   const providerOrderId='FB-'+Date.now();
   const {data:newOrder,error:e2}=await db.from('api_orders').insert({
    order_item_id:apiOrder.order_item_id,provider_id:alt.id,provider_order_id:providerOrderId,status:'processing',
    request_payload:{...apiOrder.request_payload,fallbackFrom:apiOrder.id},response_payload:{fallback:true},attempts:1
   }).select().single();
   if(e2)throw e2;
   await db.from('api_orders').update({status:'failed'}).eq('id',apiOrder.id);
   return NextResponse.json({fallback:newOrder});
  }
  const nextAttempts=attempts+1;
  await db.from('api_orders').update({attempts:nextAttempts,status:'processing'}).eq('id',apiOrder.id);
  return NextResponse.json({ok:true,retryAttempt:nextAttempts,nextDelaySeconds:Math.min(300,30*(2**attempts))});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
