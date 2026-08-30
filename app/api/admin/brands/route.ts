import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';
export async function GET(req:Request){const g=await requireAdmin(req);if(g.error)return g.error;const {data,error}=await supabaseAdmin().from('brands').select('*').order('name');return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({brands:data||[]});}
export async function POST(req:Request){const g=await requireAdmin(req);if(g.error)return g.error;try{const b=await req.json();const {data,error}=await supabaseAdmin().from('brands').insert({name:b.name,logo_url:b.logoUrl||null}).select().single();if(error)throw error;return NextResponse.json({brand:data});}catch(e:any){return NextResponse.json({error:e.message},{status:500});}}
