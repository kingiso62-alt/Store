import {NextResponse} from 'next/server';import {supabaseAdmin} from '../../../../lib/server/supabase-admin';
export async function POST(req:Request){try{const {reference,status}=await req.json();if(!reference||!status)return NextResponse.json({error:'Missing reference/status'},{status:400});const db=supabaseAdmin();const {data:payment,error}=await db.from('payments').select('*').eq('transaction_ref',reference).single();if(error||!payment)return NextResponse.json({error:'Payment not found'},{status:404});if(payment.status==='paid')return NextResponse.json({ok:true,unchanged:true});if(status==='paid'){await db.from('payments').update({status:'paid'}).eq('id',payment.id);await db.from('orders').update({status:'paid'}).eq('id',payment.order_id);const {data:items}=await db.from('order_items').select('id,product_id,variant_id,quantity,products(product_type),topup_packages(id)').eq('order_id',payment.order_id);for(const item of (items as any[])||[]){if((item.products as any)?.product_type==='physical'&&item.variant_id){await db.from('inventory_movements').update({movement_type:'sale',note:'Reservation converted to sale'}).eq('order_id',payment.order_id).eq('variant_id',item.variant_id).eq('movement_type','reservation');}}const {data:ord}=await db.from('orders').select('order_type').eq('id',payment.order_id).single();
if(ord && ['digital','mixed'].includes(ord.order_type) && process.env.INTERNAL_JOB_SECRET){
  try{
    const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
    await fetch(`${base}/api/internal/topup/dispatch`,{
      method:'POST',
      headers:{'content-type':'application/json','x-internal-secret':process.env.INTERNAL_JOB_SECRET},
      body:JSON.stringify({orderId:payment.order_id})
    });
  }catch{}
}
return NextResponse.json({ok:true,paid:true});}if(['failed','cancelled','expired'].includes(status)){await db.from('payments').update({status:'failed'}).eq('id',payment.id);await db.from('orders').update({status:'failed'}).eq('id',payment.order_id);await db.rpc('release_order_reservations',{p_order_id:payment.order_id});return NextResponse.json({ok:true,released:true});}return NextResponse.json({ok:true});}catch(e:any){return NextResponse.json({error:e.message},{status:500});}}
