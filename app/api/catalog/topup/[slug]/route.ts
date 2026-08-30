import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function GET(_:Request,{params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const db=supabaseAdmin();
  const {data:product,error}=await db.from('products')
    .select('id,name,slug,description,price,product_type,product_images(url,is_primary)')
    .eq('slug',slug).eq('product_type','digital').eq('is_active',true).single();
  if(error||!product)return NextResponse.json({error:'Top-up product not found'},{status:404});

  const {data:packages,error:pErr}=await db.from('topup_packages')
    .select('id,package_name,price,cost,provider_product_code,provider_id,api_providers(name,is_active,priority,config)')
    .eq('product_id',product.id).eq('is_active',true).order('price');
  if(pErr)return NextResponse.json({error:pErr.message},{status:500});

  const visible=(packages||[]).filter((x:any)=>x.api_providers?.is_active && x.api_providers?.config?.availability!=='down');
  const {data:fieldSchema}=await db.from('topup_field_schemas').select('fields').eq('product_id',product.id).maybeSingle();
  return NextResponse.json({product,packages:visible,fields:fieldSchema?.fields||[{name:'playerId',label:'Player ID',required:true}]});
}
