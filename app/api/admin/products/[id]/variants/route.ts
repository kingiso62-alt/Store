import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../../../lib/server/supabase-admin';

export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){
 const gate=await requireAdmin(req); if(gate.error)return gate.error; const {id}=await params;
 const {data,error}=await supabaseAdmin().from('product_variants').select('*').eq('product_id',id).order('variant_name');
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({variants:data||[]});
}
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
 const gate=await requireAdmin(req); if(gate.error)return gate.error; const {id}=await params;
 try{const b=await req.json();const {data,error}=await supabaseAdmin().from('product_variants').insert({
  product_id:id,sku:b.sku||null,variant_name:b.variantName||null,price:b.price?Number(b.price):null,stock:Number(b.stock||0),attributes:b.attributes||{}
 }).select().single();if(error)throw error;return NextResponse.json({variant:data});}catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
