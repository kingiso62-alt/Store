import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';
export async function GET(_:Request,{params}:{params:Promise<{id:string}>}){
 const {id}=await params;const db=supabaseAdmin();
 const {data,error}=await db.from('api_orders').select('id,status,attempts,provider_order_id,created_at,updated_at,api_providers(name),order_items!inner(order_id,products(name)),topup_packages(package_name)').eq('order_items.order_id',id).order('created_at',{ascending:false});
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({topups:data||[]});
}
