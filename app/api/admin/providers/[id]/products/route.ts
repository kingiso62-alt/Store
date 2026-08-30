import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../../../lib/server/supabase-admin';

export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){
 const g=await requireAdmin(req);if(g.error)return g.error;
 const {id}=await params;
 const {data,error}=await supabaseAdmin().from('topup_packages')
  .select('*,products(id,name,slug)')
  .eq('provider_id',id).order('package_name');
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({packages:data||[]});
}
