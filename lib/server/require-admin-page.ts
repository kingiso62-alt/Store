import {redirect} from 'next/navigation';
import {createSupabaseServerClient} from './supabase-ssr';
import {supabaseAdmin} from './supabase-admin';

export async function requireAdminPage(){
 const supabase=await createSupabaseServerClient();
 const {data}=await supabase.auth.getUser();
 if(!data.user) return null;
 const {data:profile}=await supabaseAdmin().from('profiles').select('role').eq('id',data.user.id).single();
 if(!profile||!['admin','super_admin'].includes(profile.role))redirect('/account');
 return {user:data.user,profile};
}
