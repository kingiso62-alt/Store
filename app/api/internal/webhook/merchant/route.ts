import {NextResponse} from 'next/server';
import crypto from 'crypto';

function valid(raw:string,sig:string|null){
 const secret=process.env.MERCHANT_WEBHOOK_SECRET||'';
 if(!secret||!sig)return false;
 const expected=crypto.createHmac('sha256',secret).update(raw).digest('hex');
 try{return crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(sig));}catch{return false;}
}

export async function POST(req:Request){
 const raw=await req.text();
 const sig=req.headers.get('x-signature');
 if(process.env.MERCHANT_WEBHOOK_SECRET && !valid(raw,sig))
  return NextResponse.json({error:'Invalid signature'},{status:401});

 try{
  const p=JSON.parse(raw);
  const reference=p.reference||p.transaction_ref||p.id;
  const rawStatus=String(p.status||'').toLowerCase();
  const status=['paid','success','successful'].includes(rawStatus)?'paid':
    ['failed','cancelled','expired'].includes(rawStatus)?rawStatus:'pending';

  const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
  const r=await fetch(`${base}/api/payments/reconcile`,{
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({reference,status})
  });
  const data=await r.json();
  return NextResponse.json({ok:r.ok,reconciled:data},{status:r.ok?200:r.status});
 }catch(e:any){
  return NextResponse.json({error:e.message},{status:500});
 }
}
