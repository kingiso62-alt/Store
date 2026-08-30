import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';
export async function POST(req:Request){
 if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const b=await req.json(),db=supabaseAdmin();
  const {data:o,error}=await db.from('orders').select('id,order_number,status,user_id').eq('id',b.orderId).single();
  if(error)throw error;
  const templates:any={
   paid:{title:'Payment received',body:`Payment for ${o.order_number} was received.`},
   processing:{title:'Order processing',body:`${o.order_number} is being processed.`},
   completed:{title:'Order completed',body:`${o.order_number} has been completed.`},
   failed:{title:'Order needs attention',body:`${o.order_number} could not be completed.`},
   refunded:{title:'Refund update',body:`Refund processing for ${o.order_number} has been updated.`}
  };
  const n=templates[b.event]||{title:'Order update',body:`${o.order_number} status: ${o.status}`};
  const {data,error:nErr}=await db.from('notifications').insert({user_id:o.user_id,title:n.title,message:n.body,type:'order',metadata:{orderId:o.id,event:b.event}}).select().single();
  return nErr?NextResponse.json({error:nErr.message},{status:500}):NextResponse.json({notification:data});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500})}
}
