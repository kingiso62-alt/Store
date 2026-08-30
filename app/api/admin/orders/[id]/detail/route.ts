import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../../../lib/server/supabase-admin';

export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){
 const g=await requireAdmin(req);if(g.error)return g.error;const {id}=await params;
 const db=supabaseAdmin();
 const [o,e,p,a]=await Promise.all([
   db.from('orders').select('*,order_items(*,products(name,product_type),product_variants(variant_name,sku))').eq('id',id).single(),
   db.from('order_events').select('*').eq('order_id',id).order('created_at'),
   db.from('payments').select('*').eq('order_id',id).order('created_at',{ascending:false}),
   db.from('api_orders').select('*,api_providers(name),order_items!inner(order_id)').eq('order_items.order_id',id)
 ]);
 if(o.error)return NextResponse.json({error:o.error.message},{status:404});
 return NextResponse.json({order:o.data,events:e.data||[],payments:p.data||[],apiOrders:a.data||[]});
}
