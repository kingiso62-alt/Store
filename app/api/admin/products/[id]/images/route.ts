import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../../../lib/server/supabase-admin';

export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
 const gate=await requireAdmin(req); if(gate.error)return gate.error; const {id}=await params;
 try{
  const b=await req.json();
  if(!b.url)return NextResponse.json({error:'Image URL required'},{status:400});
  if(b.isPrimary) await supabaseAdmin().from('product_images').update({is_primary:false}).eq('product_id',id);
  const {data,error}=await supabaseAdmin().from('product_images').insert({
    product_id:id,url:b.url,alt_text:b.altText||null,sort_order:Number(b.sortOrder||0),is_primary:!!b.isPrimary
  }).select().single();
  if(error)throw error;return NextResponse.json({image:data});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
