import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
 const g=await requireAdmin(req);if(g.error)return g.error;
 const {data,error}=await supabaseAdmin().from('delivery_rules').select('*').order('city').order('district');
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({rules:data||[]});
}
export async function POST(req:Request){
 const g=await requireAdmin(req);if(g.error)return g.error;
 try{const b=await req.json();const {data,error}=await supabaseAdmin().from('delivery_rules').insert({
  city:b.city,district:b.district||null,fee:Number(b.fee||0),free_over:b.freeOver?Number(b.freeOver):null,is_active:true
 }).select().single();if(error)throw error;return NextResponse.json({rule:data});}
 catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
