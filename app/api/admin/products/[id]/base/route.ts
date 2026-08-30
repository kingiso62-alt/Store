import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../../../lib/server/supabase-admin';

export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){
 const g=await requireAdmin(req); if(g.error)return g.error; const {id}=await params;
 const {data,error}=await supabaseAdmin().from('products')
   .select('*,categories(id,name),brands(id,name)')
   .eq('id',id).single();
 return error?NextResponse.json({error:error.message},{status:404}):NextResponse.json({product:data});
}

export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
 const g=await requireAdmin(req); if(g.error)return g.error; const {id}=await params;
 try{
  const b=await req.json();
  const patch:any={};
  for(const k of ['name','slug','description','category_id','brand_id','product_type','is_active','is_featured']){
    if(k in b) patch[k]=b[k];
  }
  if('price' in b) patch.price=Number(b.price);
  if('cost_price' in b) patch.cost_price=Number(b.cost_price||0);
  if('compare_at_price' in b) patch.compare_at_price=b.compare_at_price?Number(b.compare_at_price):null;
  const {data,error}=await supabaseAdmin().from('products').update(patch).eq('id',id).select().single();
  if(error)throw error;
  return NextResponse.json({product:data});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
