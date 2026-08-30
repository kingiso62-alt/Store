import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../../../lib/server/supabase-admin';

export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
 const g=await requireAdmin(req);if(g.error)return g.error;
 const {id}=await params;const b=await req.json();
 try{
  const db=supabaseAdmin();
  const {data,error:eventErr}=await db.from('order_events').insert({
    order_id:id,
    event_type:'delivery',
    title:b.title,
    description:b.description||null,
    metadata:{location:b.location||null}
  }).select().single();
  if(eventErr)throw eventErr;
  if(b.status) await db.from('orders').update({status:b.status}).eq('id',id);
  return NextResponse.json({event:data});
 }catch(e:any){
  return NextResponse.json({error:e.message},{status:500});
 }
}
