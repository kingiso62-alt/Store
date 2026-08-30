import {NextResponse} from 'next/server';import {requireAdmin} from '../../../../lib/server/require-admin';
export async function GET(req:Request){const g=await requireAdmin(req);if(g.error)return g.error;
 const checks=[
  ['Service role key',!!process.env.SUPABASE_SERVICE_ROLE_KEY],
  ['Internal job secret',!!process.env.INTERNAL_JOB_SECRET],
  ['Cron secret',!!process.env.CRON_SECRET],
  ['Merchant webhook secret',!!process.env.MERCHANT_WEBHOOK_SECRET],
  ['Site URL HTTPS',String(process.env.NEXT_PUBLIC_SITE_URL||'').startsWith('https://')],
  ['Top-up API key',!!process.env.TOPUP_API_KEY],
  ['Merchant API key',!!process.env.MERCHANT_API_KEY]
 ];
 return NextResponse.json({checks:checks.map(([name,ok])=>({name,ok})),score:checks.filter((x:any)=>x[1]).length,total:checks.length});
}
