import {NextResponse} from 'next/server';import {supabaseAdmin} from '../../../../lib/server/supabase-admin';
export async function POST(req:Request){try{const {apiOrderId,status,providerResponse}=await req.json();const allowed=['pending','processing','completed','failed'];if(!allowed.includes(status))return NextResponse.json({error:'Invalid status'},{status:400});const db=supabaseAdmin();const {data,error}=await db.from('api_orders').update({status,response_payload:providerResponse||{}}).eq('id',apiOrderId).select('*,order_items(order_id)').single();if(error)throw error;if(status==='completed')await db.from('orders').update({status:'completed'}).eq('id',data.order_items.order_id);
if(process.env.INTERNAL_JOB_SECRET && ['completed','failed'].includes(status)){
 try{
  const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
  await fetch(`${base}/api/internal/order-status/notify`,{method:'POST',headers:{'content-type':'application/json','x-internal-secret':process.env.INTERNAL_JOB_SECRET},body:JSON.stringify({orderId:data.order_items.order_id,status:status==='completed'?'completed':'failed'})});
 }catch{}
}
return NextResponse.json({apiOrder:data});}catch(e:any){return NextResponse.json({error:e.message},{status:500});}}
