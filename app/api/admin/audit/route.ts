import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
 const g=await requireAdmin(req);if(g.error)return g.error;
 const {data,error}=await supabaseAdmin().from('audit_logs').select('*').order('created_at',{ascending:false}).limit(300);
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({logs:data||[]});
}
