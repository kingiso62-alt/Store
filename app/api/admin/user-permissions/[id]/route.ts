import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){
  const g=await requirePermission(req,'manage_staff');if(g.error)return g.error;
  const {id}=await params;
  const {error}=await supabaseAdmin().from('user_permissions').delete().eq('id',id);
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({ok:true});
}
