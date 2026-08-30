import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
 try{
  const b=await req.json();
  const {data,error}=await supabaseAdmin().from('error_logs').insert({
   source:b.source||'unknown',
   message:String(b.message||'Unknown error').slice(0,4000),
   stack:b.stack?String(b.stack).slice(0,12000):null,
   route:b.route||null,
   metadata:b.metadata||{},
   severity:b.severity||'error'
  }).select().single();
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({logged:true,id:data.id});
 }catch(e:any){
  return NextResponse.json({error:e.message},{status:500});
 }
}
