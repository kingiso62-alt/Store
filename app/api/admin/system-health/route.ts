import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
 const g=await requirePermission(req,'manage_settings');if(g.error)return g.error;
 const db=supabaseAdmin();
 const [providers,alerts,apiOrders,payments,logs]=await Promise.all([
   db.from('api_providers').select('id,name,is_active,provider_type'),
   db.from('provider_alerts').select('id',{count:'exact',head:true}).eq('acknowledged',false),
   db.from('api_orders').select('status,created_at').gte('created_at',new Date(Date.now()-86400000).toISOString()),
   db.from('payments').select('status,created_at').gte('created_at',new Date(Date.now()-86400000).toISOString()),
   db.from('error_logs').select('id,severity,created_at').gte('created_at',new Date(Date.now()-86400000).toISOString())
 ]);
 const topups=apiOrders.data||[], pays=payments.data||[], errs=logs.data||[];
 const topupFailed=topups.filter((x:any)=>['failed','retry'].includes(x.status)).length;
 const paymentFailed=pays.filter((x:any)=>['failed','cancelled'].includes(x.status)).length;
 return NextResponse.json({
  status:(alerts.count||0)>0||topupFailed>5?'attention':'healthy',
  metrics:{
   activeProviders:(providers.data||[]).filter((x:any)=>x.is_active).length,
   totalProviders:(providers.data||[]).length,
   openAlerts:alerts.count||0,
   topups24h:topups.length,
   topupFailed24h:topupFailed,
   payments24h:pays.length,
   paymentFailed24h:paymentFailed,
   errors24h:errs.length
  }
 });
}
