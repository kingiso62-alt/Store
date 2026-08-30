import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const gate=await requireAdmin(req); if(gate.error) return gate.error;
  const {data,error}=await supabaseAdmin().from('api_providers').select('*').order('priority');
  return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({providers:data});
}

export async function POST(req:Request){
  const gate=await requireAdmin(req); if(gate.error) return gate.error;
  try{
    const b=await req.json();
    const row={
      name:b.name,
      provider_type:b.providerType,
      is_active:b.isActive!==false,
      priority:Number(b.priority||100),
      config:{
        base_url:b.baseUrl||null,
        key_env:b.keyEnv||null,
        webhook_secret_env:b.webhookSecretEnv||null
      }
    };
    const {data,error}=await supabaseAdmin().from('api_providers').insert(row).select().single();
    if(error) throw error;
    return NextResponse.json({provider:data});
  }catch(e:any){
    return NextResponse.json({error:e.message||'Provider create failed'},{status:500});
  }
}
