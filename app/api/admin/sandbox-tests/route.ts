import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const g=await requirePermission(req,'manage_settings');if(g.error)return g.error;
  const {data,error}=await supabaseAdmin().from('sandbox_test_runs').select('*')
    .order('created_at',{ascending:false}).limit(300);
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({tests:data||[]});
}

export async function POST(req:Request){
  const g=await requirePermission(req,'manage_settings');if(g.error)return g.error;
  const b=await req.json();
  const {data,error}=await supabaseAdmin().from('sandbox_test_runs').insert({
    test_type:b.testType,
    status:b.status,
    provider:b.provider||null,
    reference:b.reference||null,
    notes:b.notes||null,
    metadata:b.metadata||{}
  }).select().single();
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({test:data});
}
