import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
 const g=await requireAdmin(req);if(g.error)return g.error;
 const {id}=await params;const b=await req.json();
 if(b.role && !['customer','staff','admin'].includes(b.role))return NextResponse.json({error:'Invalid role'},{status:400});
 const {data,error}=await supabaseAdmin().from('profiles').update(b).eq('id',id).select().single();
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({profile:data});
}
