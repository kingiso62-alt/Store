import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
  const g=await requirePermission(req,'manage_settings');if(g.error)return g.error;
  const db=supabaseAdmin();

  const [providers,alerts,tests,products,methods,checks]=await Promise.all([
    db.from('api_providers').select('id,name,is_active,provider_type'),
    db.from('provider_alerts').select('id',{count:'exact',head:true}).eq('acknowledged',false),
    db.from('sandbox_test_runs').select('*').order('created_at',{ascending:false}).limit(20),
    db.from('products').select('id',{count:'exact',head:true}).eq('is_active',true),
    db.from('payment_methods').select('id',{count:'exact',head:true}).eq('is_active',true),
    db.from('launch_checks').select('required,completed')
  ]);

  const testRows=tests.data||[];
  const passed=testRows.filter((x:any)=>x.status==='passed').length;
  const failed=testRows.filter((x:any)=>x.status==='failed').length;

  const requiredChecks=(checks.data||[]).filter((x:any)=>x.required);
  const requiredDone=requiredChecks.filter((x:any)=>x.completed).length;
  return NextResponse.json({
    metrics:{
      activeProviders:(providers.data||[]).filter((x:any)=>x.is_active).length,
      totalProviders:(providers.data||[]).length,
      openProviderAlerts:alerts.count||0,
      activeProducts:products.count||0,
      activePaymentMethods:methods.count||0,
      recentSandboxPassed:passed,
      recentSandboxFailed:failed,
      requiredChecksDone:requiredDone,
      requiredChecksTotal:requiredChecks.length
    },
    launchReady:(alerts.count||0)===0 && failed===0 && passed>=3 && requiredDone===requiredChecks.length
  });
}
