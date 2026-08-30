import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req:Request){
 try{
  const {orderItemId,providerId,packageCode,playerData}=await req.json();
  if(!orderItemId||!providerId||!packageCode)
    return NextResponse.json({error:'Missing fulfillment data'},{status:400});

  const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!);

  // TODO: Provider adapter:
  // POST `${TOPUP_API_BASE_URL}/order`
  // Authorization: server-side TOPUP_API_KEY
  // body => packageCode + playerData + idempotency/order reference
  const providerOrderId='TOP-'+Date.now();

  const {data,error}=await db.from('api_orders').insert({
    order_item_id:orderItemId,
    provider_id:providerId,
    provider_order_id:providerOrderId,
    status:'processing',
    request_payload:{packageCode,playerData},
    response_payload:{mode:'placeholder'},
    attempts:1
  }).select().single();
  if(error) throw error;

  return NextResponse.json({apiOrder:data});
 }catch(e:any){
  return NextResponse.json({error:e.message||'Top-up fulfillment failed'},{status:500});
 }
}
