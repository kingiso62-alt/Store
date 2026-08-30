import {NextResponse} from 'next/server';
export async function POST(req:Request){
 try{
  const b=await req.json();const base=process.env.TOPUP_API_BASE_URL,key=process.env.TOPUP_API_KEY;
  if(!base||!key)return NextResponse.json({mode:'placeholder',provider_order_id:'TOP-'+Date.now(),status:'processing'});
  const r=await fetch(`${base}/orders`,{method:'POST',headers:{'content-type':'application/json','authorization':`Bearer ${key}`},body:JSON.stringify(b)});
  const data=await r.json().catch(()=>({}));return NextResponse.json(data,{status:r.status});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
