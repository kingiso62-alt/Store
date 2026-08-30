import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const gate=await requireAdmin(req); if(gate.error) return gate.error;
  const db=supabaseAdmin();

  const [orders,products,customers,payments,lowStock]=await Promise.all([
    db.from('orders').select('id,total,status,order_type,created_at').order('created_at',{ascending:false}).limit(25),
    db.from('products').select('id',{count:'exact',head:true}).eq('is_active',true),
    db.from('profiles').select('id',{count:'exact',head:true}).eq('role','customer'),
    db.from('payments').select('amount,status').eq('status','paid'),
    db.from('product_variants').select('id,sku,variant_name,stock,products(name)').lte('stock',5).order('stock',{ascending:true}).limit(10)
  ]);

  const paid=(payments.data||[]);
  const revenue=paid.reduce((s:any,p:any)=>s+Number(p.amount||0),0);
  const recent=orders.data||[];
  const physical=recent.filter((o:any)=>o.order_type==='physical').reduce((s:any,o:any)=>s+Number(o.total||0),0);
  const digital=recent.filter((o:any)=>o.order_type==='digital').reduce((s:any,o:any)=>s+Number(o.total||0),0);

  return NextResponse.json({
    metrics:{
      revenue,
      recentPhysicalRevenue:physical,
      recentDigitalRevenue:digital,
      totalOrders: recent.length,
      productCount: products.count||0,
      customerCount: customers.count||0
    },
    recentOrders:recent,
    lowStock:lowStock.data||[]
  });
}
