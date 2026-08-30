import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
  const gate=await requireAdmin(req); if(gate.error) return gate.error;
  const {id}=await params;
  try{
    const b=await req.json();
    const {data,error}=await supabaseAdmin().from('api_providers').update(b).eq('id',id).select().single();
    if(error) throw error;
    return NextResponse.json({provider:data});
  }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
