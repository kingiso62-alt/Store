import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
 const g=await requirePermission(req,'manage_settings');if(g.error)return g.error;
 const db=supabaseAdmin();
 const {data,error}=await db.from('launch_checks').select('*').order('sort_order');
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({checks:data||[]});
}
export async function PATCH(req:Request){
 const g=await requirePermission(req,'manage_settings');if(g.error)return g.error;
 const b=await req.json();
 const {data,error}=await supabaseAdmin().from('launch_checks').update({
   completed:!!b.completed,
   completed_at:b.completed?new Date().toISOString():null,
   notes:b.notes??undefined
 }).eq('id',b.id).select().single();
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({check:data});
}
