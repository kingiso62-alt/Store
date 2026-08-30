import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){const g=await requireAdmin(req);if(g.error)return g.error;const {id}=await params;const b=await req.json();const {data,error}=await supabaseAdmin().from('payment_methods').update(b).eq('id',id).select().single();return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({method:data});}
