import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const g=await requirePermission(req,'view_reports');if(g.error)return g.error;
  const db=supabaseAdmin();

  const {data:items,error}=await db.from('order_items')
    .select('id,quantity,unit_price,products(name,product_type,cost_price),orders!inner(id,status,created_at)')
    .in('orders.status',['paid','confirmed','preparing','out_for_delivery','delivered','completed']);
  if(error)return NextResponse.json({error:error.message},{status:500});

  const orderItemIds=(items||[]).map((x:any)=>x.id);
  const {data:apiOrders}=orderItemIds.length
    ? await db.from('api_orders').select('order_item_id,request_payload,status').in('order_item_id',orderItemIds)
    : {data:[] as any[]};

  const topupCost:any={};
  for(const a of apiOrders||[]){
    if(['processing','completed'].includes(a.status)){
      const snap=Number(a.request_payload?.costSnapshot);
      if(Number.isFinite(snap))topupCost[a.order_item_id]=snap;
    }
  }

  let revenue=0,cost=0,physicalProfit=0,digitalProfit=0;
  const rows=(items||[]).map((x:any)=>{
    const qty=Number(x.quantity||1);
    const r=Number(x.unit_price||0)*qty;
    const unitCost=x.products?.product_type==='digital'
      ? Number(topupCost[x.id] ?? x.products?.cost_price ?? 0)
      : Number(x.products?.cost_price||0);
    const c=unitCost*qty;
    const profit=r-c;
    revenue+=r;cost+=c;
    if(x.products?.product_type==='digital')digitalProfit+=profit;else physicalProfit+=profit;
    return {name:x.products?.name,type:x.products?.product_type,revenue:r,cost:c,profit};
  });

  return NextResponse.json({
    summary:{
      revenue,cost,profit:revenue-cost,
      physicalProfit,digitalProfit,
      margin:revenue?((revenue-cost)/revenue)*100:0
    },
    items:rows
  });
}
