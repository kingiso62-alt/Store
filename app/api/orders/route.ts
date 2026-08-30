import { NextResponse } from 'next/server';
import {beginIdempotent,completeIdempotent} from '../../../lib/server/idempotency';
import { supabaseAdmin } from '../../../lib/server/supabase-admin';
import {rateLimit,clientKey} from '../../../lib/server/rate-limit';

function admin(){
 return supabaseAdmin();
}

function orderNumber(){
 return 'TK'+Date.now().toString().slice(-9)+Math.floor(Math.random()*90+10);
}

export async function POST(req:Request){
 const rl=rateLimit(clientKey(req,'order'),10,60_000);if(!rl.ok)return NextResponse.json({error:'Too many requests'},{status:429,headers:{'Retry-After':String(Math.ceil((rl.resetAt-Date.now())/1000))}});
 try{
  const body=await req.json();
  const idemKey=req.headers.get('x-idempotency-key')||body.idempotencyKey||'';
  if(idemKey){
    const idem=await beginIdempotent(idemKey,'order_create',body);
    if(idem.existing && idem.record.status==='completed') return NextResponse.json(idem.record.response);
  }
  const {userId,items,deliveryAddress,shipping:requestedShipping=0,discount=0}=body;
  if(!Array.isArray(items)||items.length===0)
    return NextResponse.json({error:'Cart is empty'},{status:400});

  const db=admin();
  const subtotal=items.reduce((s:number,x:any)=>s+(Number(x.price)*Number(x.quantity)),0);
  let shipping=Number(requestedShipping||0);
  const hasPhysical=items.some((x:any)=>x.productType==='physical');
  if(hasPhysical && deliveryAddress?.city){
    let q=db.from('delivery_rules').select('*').eq('is_active',true).eq('city',deliveryAddress.city);
    const {data:rules}=await q;
    const exact=(rules||[]).find((r:any)=>r.district && r.district===deliveryAddress.district);
    const cityWide=(rules||[]).find((r:any)=>!r.district);
    const rule=exact||cityWide;
    if(rule){
      shipping=(rule.free_over && subtotal>=Number(rule.free_over))?0:Number(rule.fee||0);
    }
  }
  const total=Math.max(0,subtotal+shipping-Number(discount));
  const types=[...new Set(items.map((x:any)=>x.productType))];
  const orderType=types.length>1?'mixed':types[0]==='digital'?'digital':'physical';
  const {data:order,error}=await db.from('orders').insert({
    user_id:userId||null,
    order_number:orderNumber(),
    order_type:orderType,
    status:'pending',
    subtotal,shipping,discount,total,
    delivery_address:deliveryAddress||null
  }).select().single();
  if(error) throw error;

  const rows=items.map((x:any)=>({
    order_id:order.id,
    product_id:x.productId,
    variant_id:x.variantId||null,
    quantity:x.quantity,
    unit_price:x.price,
    player_data:x.playerData||null
  }));
  const {data:createdItems,error:itemErr}=await db.from('order_items').insert(rows).select();
  if(itemErr) throw itemErr;

  // Reserve physical stock immediately when a real variant is present.
  for(const item of createdItems||[]){
    const source=items.find((x:any)=>x.variantId===item.variant_id && x.productId===item.product_id);
    if(source?.productType==='physical' && item.variant_id){
      const {error:reserveErr}=await db.rpc('reserve_variant_stock',{
        p_variant_id:item.variant_id,
        p_qty:item.quantity,
        p_order_id:order.id
      });
      if(reserveErr) throw reserveErr;
    }
  }

  const response={order};
  if(idemKey)await completeIdempotent(idemKey,'order_create',response);
  return NextResponse.json(response);
 }catch(e:any){
  return NextResponse.json({error:e.message||'Order creation failed'},{status:500});
 }
}