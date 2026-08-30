import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const g=await requirePermission(req,'manage_topups');if(g.error)return g.error;
  const {data,error}=await supabaseAdmin().from('topup_packages')
    .select('*,products(id,name,slug),api_providers(id,name,priority,is_active)')
    .order('package_name');
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({packages:data||[]});
}

export async function POST(req:Request){
  const g=await requirePermission(req,'manage_topups');if(g.error)return g.error;
  try{
    const b=await req.json();
    const {data,error}=await supabaseAdmin().from('topup_packages').insert({
      product_id:b.productId,
      provider_id:b.providerId,
      provider_product_code:b.providerProductCode,
      package_name:b.packageName,
      cost:Number(b.cost||0),
      price:Number(b.price),
      is_active:b.isActive!==false
    }).select().single();
    if(error)throw error;
    return NextResponse.json({package:data});
  }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
