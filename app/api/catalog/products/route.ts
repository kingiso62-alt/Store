import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const url=new URL(req.url);
  const type=url.searchParams.get('type');
  const featured=url.searchParams.get('featured');
  let q=supabaseAdmin().from('products')
    .select('id,name,slug,description,product_type,price,compare_at_price,is_featured,product_images(url,is_primary),product_variants(id,sku,variant_name,price,stock,attributes),categories(name,slug),brands(name)')
    .eq('is_active',true)
    .order('created_at',{ascending:false});
  if(type) q=q.eq('product_type',type);
  if(featured==='true') q=q.eq('is_featured',true);
  const {data,error}=await q;
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({products:data});
}
