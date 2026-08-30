import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
  if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)
    return NextResponse.json({error:'Unauthorized'},{status:401});

  try{
    const db=supabaseAdmin();
    const threshold=Number(process.env.MIN_PROVIDER_BALANCE||5);
    const {data:providers,error}=await db.from('api_providers').select('*').eq('provider_type','topup');
    if(error)throw error;

    const results:any[]=[];
    for(const p of providers||[]){
      const {data:bal}=await db.from('provider_balances').select('*').eq('provider_id',p.id).order('created_at',{ascending:false}).limit(1).maybeSingle();
      const {data:health}=await db.from('provider_health').select('*').eq('provider_id',p.id).order('created_at',{ascending:false}).limit(1).maybeSingle();
      const low=bal && Number(bal.balance)<threshold;
      const down=health?.status==='down';
      const shouldDisable=!!(low||down);

      if(shouldDisable && p.is_active){
        await db.from('api_providers').update({is_active:false}).eq('id',p.id);
        await db.from('provider_alerts').insert({
          provider_id:p.id,
          alert_type:low?'low_balance':'health_down',
          message:low?`Balance below ${threshold}`:'Provider health is down',
          severity:'critical'
        });
      }
      results.push({provider:p.name,disabled:shouldDisable,lowBalance:!!low,health:health?.status||'unknown',balance:bal?.balance??null});
    }
    return NextResponse.json({results});
  }catch(e:any){
    return NextResponse.json({error:e.message},{status:500});
  }
}
