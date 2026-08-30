import {NextResponse} from 'next/server';
export async function POST(req:Request){
 try{
  const b=await req.json();const base=process.env.TOPUP_API_BASE_URL,key=process.env.TOPUP_API_KEY;
  if(!base||!key)return NextResponse.json({mode:'placeholder',status:'processing',provider_order_id:b.providerOrderId});
  const r=await fetch(`${base}/orders/${encodeURIComponent(b.providerOrderId)}`,{headers:{'authorization':`Bearer ${key}`}});
  const data=await r.json().catch(()=>({}));return NextResponse.json(data,{status:r.status});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
