import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

function validSignature(raw:string,signature:string|null){
 const secret=process.env.MERCHANT_WEBHOOK_SECRET||'';
 if(!secret||!signature) return false;
 const expected=crypto.createHmac('sha256',secret).update(raw).digest('hex');
 try { return crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)); }
 catch { return false; }
}

export async function POST(req:Request){
 const raw=await req.text();
 const signature=req.headers.get('x-signature');

 // Enable strict signature verification once the merchant docs confirm header/body format.
 if(process.env.MERCHANT_WEBHOOK_SECRET && !validSignature(raw,signature))
   return NextResponse.json({error:'Invalid signature'},{status:401});

 try{
  const payload=JSON.parse(raw);
  const ref=payload.reference||payload.transaction_ref;
  const success=payload.status==='success'||payload.status==='paid';

  const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const {data:payment,error}=await db.from('payments')
   .update({status:success?'paid':'failed',raw_response:payload})
   .eq('transaction_ref',ref).select().single();
  if(error) throw error;

  if(success){
   await db.from('orders').update({status:'paid'}).eq('id',payment.order_id);
  }
  return NextResponse.json({ok:true});
 }catch(e:any){
  return NextResponse.json({error:e.message||'Webhook failed'},{status:500});
 }
}
