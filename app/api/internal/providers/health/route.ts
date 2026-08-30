import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function GET(req:Request){return run(req)}
export async function POST(req:Request){return run(req)}

async function run(req:Request){
 const auth=req.headers.get('authorization')||'';
 const secret=req.headers.get('x-internal-secret')||'';
 const cronSecret=process.env.CRON_SECRET||'';
 if(secret!==process.env.INTERNAL_JOB_SECRET && (!cronSecret || auth!==`Bearer ${cronSecret}`))
  return NextResponse.json({error:'Unauthorized'},{status:401});

 try{
  const db=supabaseAdmin();
  const {data:providers,error}=await db.from('api_providers').select('*').eq('is_active',true);
  if(error)throw error;
  const results:any[]=[];
  for(const p of providers||[]){
    const url=p.config?.health_url||p.config?.base_url||null;
    let status='unknown';
    let latency_ms:number|null=null;
    let http_status:number|null=null;
    let errorText:string|null=null;
    if(url){
      const start=Date.now();
      try{
        const r=await fetch(url,{method:'GET',signal:AbortSignal.timeout(8000)});
        latency_ms=Date.now()-start;http_status=r.status;status=r.ok?'up':'degraded';
      }catch(e:any){latency_ms=Date.now()-start;status='down';errorText=e.message;}
    }
    await db.from('provider_health').insert({provider_id:p.id,status,latency_ms,http_status,error:errorText});
    const nextConfig={...(p.config||{}),availability:status==='down'?'down':'up',last_health_check:new Date().toISOString()};
    await db.from('api_providers').update({config:nextConfig}).eq('id',p.id);
    results.push({provider:p.name,status,latency_ms,http_status});
  }
  return NextResponse.json({checked:results.length,results});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
