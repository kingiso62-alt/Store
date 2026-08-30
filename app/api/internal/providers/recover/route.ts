import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
  if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)
    return NextResponse.json({error:'Unauthorized'},{status:401});

  try{
    const db=supabaseAdmin();
    const minBalance=Number(process.env.MIN_PROVIDER_BALANCE||5);
    const {data:providers,error}=await db.from('api_providers')
      .select('*').eq('provider_type','topup').eq('is_active',false);
    if(error)throw error;

    const results:any[]=[];
    for(const p of providers||[]){
      const {data:bal}=await db.from('provider_balances').select('*')
        .eq('provider_id',p.id).order('created_at',{ascending:false}).limit(1).maybeSingle();
      const {data:health}=await db.from('provider_health').select('*')
        .eq('provider_id',p.id).order('created_at',{ascending:false}).limit(1).maybeSingle();

      const balanceOk=!bal || Number(bal.balance)>=minBalance;
      const healthOk=!health || ['up','degraded','unknown'].includes(health.status);

      if(balanceOk && healthOk){
        await db.from('api_providers').update({is_active:true}).eq('id',p.id);
        await db.from('provider_alerts').insert({
          provider_id:p.id,
          alert_type:'recovered',
          message:'Provider automatically re-enabled after recovery.',
          severity:'info'
        });
        results.push({provider:p.name,reEnabled:true});
      }else{
        results.push({provider:p.name,reEnabled:false,balanceOk,healthOk});
      }
    }
    return NextResponse.json({results});
  }catch(e:any){
    return NextResponse.json({error:e.message},{status:500});
  }
}
