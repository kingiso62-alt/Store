import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const g=await requirePermission(req,'manage_staff');if(g.error)return g.error;
  const db=supabaseAdmin();
  const {data:staff}=await db.from('profiles').select('id,full_name,role')
    .in('role',['staff','admin']).order('full_name');
  const {data:overrides}=await db.from('user_permissions').select('*');
  return NextResponse.json({staff:staff||[],overrides:overrides||[]});
}

export async function POST(req:Request){
  const g=await requirePermission(req,'manage_staff');if(g.error)return g.error;
  const b=await req.json();
  const {data,error}=await supabaseAdmin().from('user_permissions').upsert({
    user_id:b.userId,
    permission:b.permission,
    allowed:!!b.allowed
  },{onConflict:'user_id,permission'}).select().single();
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({override:data});
}
