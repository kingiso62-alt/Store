import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const g=await requireAdmin(req);if(g.error)return g.error;
  const {data,error}=await supabaseAdmin().from('role_permissions').select('*').order('role').order('permission');
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({permissions:data||[]});
}

export async function POST(req:Request){
  const g=await requireAdmin(req);if(g.error)return g.error;
  const b=await req.json();
  if(!['staff','admin'].includes(b.role))return NextResponse.json({error:'Role not configurable here'},{status:400});
  const {data,error}=await supabaseAdmin().from('role_permissions').upsert({
    role:b.role,permission:b.permission,allowed:!!b.allowed
  },{onConflict:'role,permission'}).select().single();
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({permission:data});
}
