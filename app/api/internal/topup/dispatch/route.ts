import {NextResponse} from 'next/server';import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
 try{
  const secret=req.headers.get('x-internal-secret');
  if(!process.env.INTERNAL_JOB_SECRET||secret!==process.env.INTERNAL_JOB_SECRET)
    return NextResponse.json({error:'Unauthorized'},{status:401});
  const {orderId}=await req.json(); const db=supabaseAdmin();
  const {data:items,error}=await db.from('order_items')
   .select('id,player_data,products(id,product_type),topup_packages(id,provider_id,provider_product_code,price)')
   .eq('order_id',orderId);
  if(error)throw error;
  const digital=(items||[]).filter((x:any)=>x.products?.product_type==='digital');
  const dispatched:any[]=[];
  for(const item of digital){
   const pkg=item.topup_packages?.[0];
   if(!pkg)continue;
   const {data:provider}=await db.from('api_providers').select('*').eq('id',pkg.provider_id).eq('is_active',true).single();
   if(!provider)continue;
   const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
   const rr=await fetch(`${base}/api/providers/topup/order`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({packageCode:pkg.provider_product_code,playerData:item.player_data,providerId:provider.id,orderItemId:item.id})});
   const providerResponse=await rr.json().catch(()=>({}));
   const providerOrderId=providerResponse.provider_order_id||providerResponse.order_id||('AUTO-'+Date.now()+'-'+Math.random().toString(36).slice(2,7));
   const {data:apiOrder,error:e2}=await db.from('api_orders').insert({
    order_item_id:item.id,provider_id:provider.id,provider_order_id:providerOrderId,status:providerResponse.status||'processing',
    request_payload:{packageCode:pkg.provider_product_code,playerData:item.player_data,auto:true,costSnapshot:Number((pkg as any).cost||0),sellPrice:Number((pkg as any).price||0)},
    response_payload:providerResponse,attempts:1
   }).select().single();
   if(e2)throw e2; dispatched.push(apiOrder);
  }
  if(dispatched.length)await db.from('orders').update({status:'processing'}).eq('id',orderId);
  return NextResponse.json({ok:true,dispatched});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
