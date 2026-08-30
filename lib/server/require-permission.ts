import {NextResponse} from 'next/server';
import {requireAdmin} from './require-admin';
import {supabaseAdmin} from './supabase-admin';

export async function requirePermission(req:Request,permission:string){
  const g=await requireAdmin(req);
  if(g.error)return g;
  if(g.profile?.role==='super_admin')return g;

  const db=supabaseAdmin();
  const userId=g.user?.id;
  if(userId){
    const {data:override}=await db.from('user_permissions').select('allowed')
      .eq('user_id',userId).eq('permission',permission).maybeSingle();
    if(override)return override.allowed ? g : {error:NextResponse.json({error:'Forbidden'},{status:403})};
  }

  const {data}=await db.from('role_permissions').select('allowed')
    .eq('role',g.profile?.role).eq('permission',permission).maybeSingle();
  if(!data?.allowed)return {error:NextResponse.json({error:'Forbidden'},{status:403})};
  return g;
}
