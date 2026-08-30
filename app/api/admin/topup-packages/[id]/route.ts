import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
 const g=await requireAdmin(req);if(g.error)return g.error;
 const {id}=await params;const b=await req.json();
 const db=supabaseAdmin();
 const {data:before}=await db.from('topup_packages').select('cost,provider_id').eq('id',id).single();
 const patch:any={};
 for(const k of ['product_id','provider_id','provider_product_code','package_name','is_active']) if(k in b) patch[k]=b[k];
 if('cost'in b)patch.cost=Number(b.cost||0);
 if('price'in b)patch.price=Number(b.price);
 const {data,error}=await db.from('topup_packages').update(patch).eq('id',id).select().single();
 if(!error && before && 'cost' in patch && Number(before.cost)!==Number(patch.cost)){
   const oldCost=Number(before.cost||0),newCost=Number(patch.cost||0);
   const pct=oldCost?((newCost-oldCost)/oldCost)*100:100;
   await db.from('cost_change_alerts').insert({topup_package_id:id,provider_id:before.provider_id,old_cost:oldCost,new_cost:newCost,change_percent:pct});
 }
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({package:data});
}

export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){
 const g=await requireAdmin(req);if(g.error)return g.error;
 const {id}=await params;
 const {error}=await supabaseAdmin().from('topup_packages').delete().eq('id',id);
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({ok:true});
}
