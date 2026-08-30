import {NextResponse} from 'next/server';import {supabaseAdmin} from '../../../../lib/server/supabase-admin';
export async function GET(req:Request){
 const u=new URL(req.url);const q=(u.searchParams.get('q')||'').trim();const category=u.searchParams.get('category');const brand=u.searchParams.get('brand');const type=u.searchParams.get('type');const min=Number(u.searchParams.get('min')||0);const max=Number(u.searchParams.get('max')||999999);
 let s=supabaseAdmin().from('products').select('id,name,slug,price,compare_at_price,product_type,product_images(url,is_primary),categories(name,slug),brands(name)').eq('is_active',true).gte('price',min).lte('price',max);
 if(q)s=s.ilike('name',`%${q}%`);
 if(category)s=s.eq('category_id',category);
 if(brand)s=s.eq('brand_id',brand);if(type)s=s.eq('product_type',type);
 const {data,error}=await s.order('created_at',{ascending:false}).limit(100);
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({products:data||[]});
}
