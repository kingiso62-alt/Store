import {NextResponse} from 'next/server';import {requirePermission} from '../../../../../lib/server/require-permission';import {writeAudit} from '../../../../../lib/server/audit';import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';
const allowed=['pending','paid','confirmed','preparing','processing','out_for_delivery','completed','delivered','failed','cancelled','refunded'];
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){const gate=await requirePermission(req,'manage_orders');if(gate.error)return gate.error;const {id}=await params;const b=await req.json();if(!allowed.includes(b.status))return NextResponse.json({error:'Invalid status'},{status:400});const {data,error}=await supabaseAdmin().from('orders').update({status:b.status}).eq('id',id).select().single();
if(!error && data && process.env.INTERNAL_JOB_SECRET){
 try{
  const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
  await fetch(`${base}/api/internal/order-status/notify`,{method:'POST',headers:{'content-type':'application/json','x-internal-secret':process.env.INTERNAL_JOB_SECRET},body:JSON.stringify({orderId:id,status:b.status})});
 }catch{}
}
if(!error)await writeAudit(gate.user?.id,'order_status_update','order',id,{status:b.status});return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({order:data});}
