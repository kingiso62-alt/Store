import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function GET(_:Request,{params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const {data,error}=await supabaseAdmin().from('products')
    .select('*,product_images(*),product_variants(*),categories(name,slug),brands(name)')
    .eq('slug',slug).eq('is_active',true).single();
  if(error) return NextResponse.json({error:error.message},{status:404});
  return NextResponse.json({product:data});
}
