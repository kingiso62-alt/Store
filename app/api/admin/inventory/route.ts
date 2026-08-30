import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const gate=await requirePermission(req,'manage_inventory'); if(gate.error) return gate.error;
  const {data,error}=await supabaseAdmin().from('product_variants')
    .select('id,sku,variant_name,stock,products(name,slug)')
    .order('stock',{ascending:true});
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({inventory:data});
}

export async function POST(req:Request){
  const gate=await requirePermission(req,'manage_inventory'); if(gate.error) return gate.error;
  try{
    const {variantId,quantity,note}=await req.json();
    const db=supabaseAdmin();
    const {data:v,error:e1}=await db.from('product_variants').select('stock').eq('id',variantId).single();
    if(e1) throw e1;
    const next=Number(v.stock||0)+Number(quantity||0);
    if(next<0) return NextResponse.json({error:'Stock cannot be negative'},{status:400});
    const {error:e2}=await db.from('product_variants').update({stock:next}).eq('id',variantId);
    if(e2) throw e2;
    await db.from('inventory_movements').insert({variant_id:variantId,movement_type:'adjustment',quantity:Number(quantity),note:note||'Admin adjustment'});
    return NextResponse.json({ok:true,stock:next});
  }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
