import {NextResponse} from 'next/server';import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';
export async function POST(req:Request){
 if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const {orderId,status}=await req.json();const db=supabaseAdmin();
  const {data:order,error}=await db.from('orders').select('id,user_id,order_number,order_type').eq('id',orderId).single();
  if(error||!order)return NextResponse.json({error:'Order not found'},{status:404});
  const labels:any={
   paid:['Payment received',`Payment for ${order.order_number} was received.`],
   confirmed:['Order confirmed',`${order.order_number} has been confirmed.`],
   preparing:['Order preparing',`${order.order_number} is being prepared.`],
   out_for_delivery:['Out for delivery',`${order.order_number} is out for delivery.`],
   delivered:['Order delivered',`${order.order_number} has been delivered.`],
   processing:['Top-up processing',`${order.order_number} is being processed.`],
   completed:['Top-up completed',`${order.order_number} has been completed.`],
   failed:['Order failed',`${order.order_number} could not be completed.`],
   cancelled:['Order cancelled',`${order.order_number} was cancelled.`],
   refunded:['Refund completed',`${order.order_number} has been refunded.`]
  };
  const x=labels[status]; if(!x||!order.user_id)return NextResponse.json({ok:true,skipped:true});
  const {data,error:e2}=await db.from('notifications').insert({user_id:order.user_id,order_id:order.id,title:x[0],body:x[1],type:'order_status',read:false}).select().single();
  return e2?NextResponse.json({error:e2.message},{status:500}):NextResponse.json({notification:data});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
