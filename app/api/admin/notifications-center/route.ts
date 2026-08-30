import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';
export async function GET(req:Request){
 const g=await requirePermission(req,'manage_settings');if(g.error)return g.error;
 const db=supabaseAdmin();
 const [provider,cost,errors]=await Promise.all([
  db.from('provider_alerts').select('id,alert_type,message,severity,created_at,acknowledged').eq('acknowledged',false).limit(100),
  db.from('cost_change_alerts').select('id,change_percent,created_at,acknowledged').eq('acknowledged',false).limit(100),
  db.from('error_logs').select('id,message,severity,created_at').order('created_at',{ascending:false}).limit(50)
 ]);
 const items=[
  ...(provider.data||[]).map((x:any)=>({...x,source:'provider',title:x.alert_type})),
  ...(cost.data||[]).map((x:any)=>({...x,source:'cost',title:'Supplier cost changed',message:`Cost changed ${Number(x.change_percent).toFixed(1)}%`,severity:'warning'})),
  ...(errors.data||[]).map((x:any)=>({...x,source:'system',title:'System error'}))
 ].sort((a:any,b:any)=>+new Date(b.created_at)-+new Date(a.created_at));
 return NextResponse.json({items});
}
