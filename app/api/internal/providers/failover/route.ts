import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
 if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)return NextResponse.json({error:'Unauthorized'},{status:401});
 const db=supabaseAdmin();
 try{
   const {data:failed,error}=await db.from('api_orders').select('*,order_items(product_id)')
     .in('status',['failed','retry']).lt('attempts',3).order('updated_at').limit(50);
   if(error)throw error;
   const results:any[]=[];
   for(const job of failed||[]){
     const productId=job.order_items?.product_id;
     if(!productId){results.push({id:job.id,status:'skipped'});continue;}
     const {data:current}=await db.from('topup_packages').select('provider_id,package_name').eq('id',job.topup_package_id).maybeSingle();
     const {data:alternatives}=await db.from('topup_packages')
       .select('*,api_providers!inner(id,name,priority,is_active)')
       .eq('product_id',productId).eq('package_name',current?.package_name||'').eq('is_active',true)
       .neq('provider_id',current?.provider_id||'').order('price');
     const alt=(alternatives||[]).filter((x:any)=>x.api_providers?.is_active)[0];
     if(!alt){results.push({id:job.id,status:'no_fallback'});continue;}
     await db.from('api_orders').update({
       provider_id:alt.provider_id,
       topup_package_id:alt.id,
       status:'queued',
       attempts:Number(job.attempts||0)+1,
       updated_at:new Date().toISOString()
     }).eq('id',job.id);
     results.push({id:job.id,status:'rerouted',provider:alt.api_providers?.name});
   }
   return NextResponse.json({results});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
