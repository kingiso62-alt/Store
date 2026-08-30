import fs from 'node:fs';
const checks=[
 ['schema',fs.existsSync('supabase/schema.sql')],
 ['vercel config',fs.existsSync('vercel.json')],
 ['robots',fs.existsSync('app/robots.ts')],
 ['sitemap',fs.existsSync('app/sitemap.ts')],
 ['manifest',fs.existsSync('app/manifest.ts')],
 ['merchant adapter',fs.existsSync('app/api/providers/merchant/create/route.ts')],
 ['topup adapter',fs.existsSync('app/api/providers/topup/order/route.ts')],
 ['launch dashboard',fs.existsSync('app/admin/launch-dashboard/page.tsx')],
 ['launch checklist',fs.existsSync('app/admin/launch-checklist/page.tsx')]
];
for(const [name,ok] of checks)console.log(`${ok?'PASS':'FAIL'} ${name}`);
if(checks.some(x=>!x[1]))process.exit(1);
