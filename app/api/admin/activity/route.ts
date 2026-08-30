import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';
export async function GET(req:Request){
 const g=await requirePermission(req,'view_reports');if(g.error)return g.error;
 const {data,error}=await supabaseAdmin().from('audit_logs').select('*').order('created_at',{ascending:false}).limit(500);
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({activity:data||[]});
}
