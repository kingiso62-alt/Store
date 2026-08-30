const core=[
'NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_ANON_KEY','SUPABASE_SERVICE_ROLE_KEY',
'NEXT_PUBLIC_SITE_URL','INTERNAL_JOB_SECRET'
];
const provider=['MERCHANT_API_BASE_URL','MERCHANT_API_KEY','TOPUP_API_BASE_URL','TOPUP_API_KEY'];
const missingCore=core.filter(k=>!process.env[k]);
const missingProvider=provider.filter(k=>!process.env[k]);
if(missingCore.length){console.error('Missing CORE environment variables:',missingCore.join(', '));process.exit(1)}
if(missingProvider.length)console.warn('Provider integration variables still missing:',missingProvider.join(', '));
console.log('Core production environment: OK');
console.log('Provider configuration:',missingProvider.length?'INCOMPLETE':'OK');
