import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
 const g=await requirePermission(req,'manage_topups');if(g.error)return g.error;
 const u=new URL(req.url),status=u.searchParams.get('status');
 let q=supabaseAdmin().from('api_orders').select('*,api_providers(name),order_items(quantity,unit_price,products(name)),topup_packages(package_name,cost,price)').order('created_at',{ascending:false}).limit(300);
 if(status)q=q.eq('status',status);
 const {data,error}=await q;
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({orders:data||[]});
}
