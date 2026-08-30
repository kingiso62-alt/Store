import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
 const g=await requireAdmin(req);if(g.error)return g.error;
 const {data,error}=await supabaseAdmin().from('topup_field_schemas').select('*,products(name,slug)').order('created_at',{ascending:false});
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({schemas:data||[]});
}
export async function POST(req:Request){
 const g=await requireAdmin(req);if(g.error)return g.error;
 const b=await req.json();
 const {data,error}=await supabaseAdmin().from('topup_field_schemas').upsert({
   product_id:b.productId,
   fields:b.fields||[],
   updated_at:new Date().toISOString()
 },{onConflict:'product_id'}).select().single();
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({schema:data});
}
