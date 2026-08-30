import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const g=await requireAdmin(req);if(g.error)return g.error;
  const db=supabaseAdmin();
  const {data:providers,error}=await db.from('api_providers').select('*').eq('provider_type','topup').order('priority');
  if(error)return NextResponse.json({error:error.message},{status:500});
  const rows=[];
  for(const p of providers||[]){
    const {data:b}=await db.from('provider_balances').select('*').eq('provider_id',p.id).order('created_at',{ascending:false}).limit(1).maybeSingle();
    rows.push({...p,balance:b||null});
  }
  return NextResponse.json({providers:rows});
}

export async function POST(req:Request){
  const g=await requireAdmin(req);if(g.error)return g.error;
  const b=await req.json();
  const {data,error}=await supabaseAdmin().from('provider_balances').insert({
    provider_id:b.providerId,
    balance:Number(b.balance||0),
    currency:b.currency||'USD',
    source:b.source||'manual'
  }).select().single();
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({balance:data});
}
