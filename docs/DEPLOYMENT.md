# TOKIYO STORE Deployment

## Supabase
1. Create project.
2. Run `supabase/schema.sql`.
3. Optionally run `supabase/seed.sql`.
4. Create/update one profile role to `super_admin`.
5. Verify Storage bucket `product-images`.

## Vercel
Set:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_SITE_URL
- INTERNAL_JOB_SECRET
- CRON_SECRET
- MERCHANT_API_BASE_URL
- MERCHANT_API_KEY
- MERCHANT_WEBHOOK_SECRET
- TOPUP_API_BASE_URL
- TOPUP_API_KEY

## Cron
`vercel.json` schedules:
- top-up worker
- provider health check

## Launch gate
Do not enable real-money checkout until merchant and top-up sandbox tests pass.
