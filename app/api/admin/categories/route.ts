import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';
export async function GET(req:Request){const g=await requireAdmin(req);if(g.error)return g.error;const {data,error}=await supabaseAdmin().from('categories').select('*').order('name');return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({categories:data||[]});}
export async function POST(req:Request){const g=await requireAdmin(req);if(g.error)return g.error;try{const b=await req.json();const {data,error}=await supabaseAdmin().from('categories').insert({name:b.name,slug:b.slug,type:b.type}).select().single();if(error)throw error;return NextResponse.json({category:data});}catch(e:any){return NextResponse.json({error:e.message},{status:500});}}
