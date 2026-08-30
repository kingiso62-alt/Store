import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){
 const {id}=await params;const db=supabaseAdmin();
 const {data:o,error}=await db.from('orders').select('id,order_number,status,order_type,total,created_at,updated_at').eq('id',id).single();
 if(error||!o)return NextResponse.json({error:'Order not found'},{status:404});
 const {data:payments}=await db.from('payments').select('status,transaction_ref,created_at').eq('order_id',id).order('created_at',{ascending:false});
 const {data:items}=await db.from('order_items').select('id,quantity,unit_price,products(name,product_type)').eq('order_id',id);
 return NextResponse.json({order:o,payments:payments||[],items:items||[]});
}
