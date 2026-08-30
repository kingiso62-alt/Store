import {NextResponse} from 'next/server';
export async function POST(req:Request){
 try{
  const b=await req.json();const base=process.env.MERCHANT_API_BASE_URL,key=process.env.MERCHANT_API_KEY;
  if(!base||!key)return NextResponse.json({mode:'placeholder',status:'refund_pending',reference:b.reference});
  const r=await fetch(`${base}/refunds`,{method:'POST',headers:{'content-type':'application/json','authorization':`Bearer ${key}`},body:JSON.stringify(b)});
  const data=await r.json().catch(()=>({}));return NextResponse.json(data,{status:r.status});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
