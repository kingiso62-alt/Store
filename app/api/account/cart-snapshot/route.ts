import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';
async function user(req:Request){const t=req.headers.get('authorization')?.replace('Bearer ','');if(!t)return null;const {data}=await supabaseAdmin().auth.getUser(t);return data.user||null}
export async function POST(req:Request){
 const u=await user(req);if(!u)return NextResponse.json({error:'Unauthorized'},{status:401});
 const b=await req.json(),items=Array.isArray(b.items)?b.items:[];
 const value=items.reduce((s:number,x:any)=>s+Number(x.price||0)*Number(x.quantity||1),0);
 const count=items.reduce((s:number,x:any)=>s+Number(x.quantity||1),0);
 const db=supabaseAdmin();
 const {data:existing}=await db.from('abandoned_carts').select('id').eq('user_id',u.id).eq('recovered',false).order('updated_at',{ascending:false}).limit(1).maybeSingle();
 if(!items.length){
   if(existing)await db.from('abandoned_carts').update({items:[],item_count:0,cart_value:0,recovered:true,updated_at:new Date().toISOString()}).eq('id',existing.id);
   return NextResponse.json({ok:true});
 }
 const payload={user_id:u.id,items,item_count:count,cart_value:value,updated_at:new Date().toISOString(),recovered:false};
 const q=existing?db.from('abandoned_carts').update(payload).eq('id',existing.id):db.from('abandoned_carts').insert(payload);
 const {data,error}=await q.select().single();
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({cart:data});
}
