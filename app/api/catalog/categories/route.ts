import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';
export async function GET(){
 const {data,error}=await supabaseAdmin().from('categories').select('*').order('name');
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({categories:data||[]});
}
