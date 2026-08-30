import {NextResponse} from 'next/server';
import {createSupabaseServerClient} from '../../../../lib/server/supabase-ssr';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(){
  const supabase=await createSupabaseServerClient();
  const {data,error}=await supabase.auth.getUser();
  if(error||!data.user)return NextResponse.json({authenticated:false},{status:401});
  const {data:profile}=await supabaseAdmin().from('profiles').select('role,full_name').eq('id',data.user.id).single();
  const allowed=profile&&['admin','super_admin'].includes(profile.role);
  return NextResponse.json({authenticated:true,authorized:!!allowed,user:{id:data.user.id,email:data.user.email},profile});
}
