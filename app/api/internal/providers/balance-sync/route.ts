import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
 if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)
  return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const db=supabaseAdmin();
  const {data:providers,error}=await db.from('api_providers').select('*').eq('provider_type','topup').eq('is_active',true);
  if(error)throw error;
  const results=[];
  for(const p of providers||[]){
    const balanceUrl=p.config?.balance_url;
    if(!balanceUrl){results.push({provider:p.name,status:'skipped'});continue;}
    try{
      const keyName=p.config?.key_env||'TOPUP_API_KEY';
      const key=(process.env as any)[keyName]||process.env.TOPUP_API_KEY;
      const r=await fetch(balanceUrl,{headers:key?{'authorization':`Bearer ${key}`}:{},signal:AbortSignal.timeout(8000)});
      const j=await r.json();
      const balance=Number(j.balance??j.data?.balance??NaN);
      const currency=j.currency||j.data?.currency||'USD';
      if(Number.isFinite(balance)){
        await db.from('provider_balances').insert({provider_id:p.id,balance,currency,source:'api'});
        results.push({provider:p.name,status:'ok',balance,currency});
      }else results.push({provider:p.name,status:'unmapped'});
    }catch(e:any){results.push({provider:p.name,status:'error',error:e.message});}
  }
  return NextResponse.json({results});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
