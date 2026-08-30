import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const g=await requirePermission(req,'manage_topups');if(g.error)return g.error;
  const {data,error}=await supabaseAdmin().from('provider_alerts')
    .select('*,api_providers(name)')
    .order('created_at',{ascending:false}).limit(300);
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({alerts:data||[]});
}

export async function PATCH(req:Request){
  const g=await requirePermission(req,'manage_topups');if(g.error)return g.error;
  const b=await req.json();
  const {data,error}=await supabaseAdmin().from('provider_alerts')
    .update({acknowledged:!!b.acknowledged})
    .eq('id',b.id).select().single();
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({alert:data});
}
