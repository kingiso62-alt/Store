# TOKIYO STORE Production Checklist

## Before real payments
- Set HTTPS production URL
- Set Supabase production keys
- Set strong INTERNAL_JOB_SECRET
- Set CRON_SECRET
- Configure Merchant API base URL/key/webhook secret
- Configure Top-up API base URL/key
- Verify webhook signature exact format from provider docs
- Test duplicate webhook delivery
- Test idempotent order/payment create
- Test failed payment stock release
- Test successful payment stock conversion
- Test top-up retry/fallback
- Test refund in sandbox

## Security
- Migrate admin auth to @supabase/ssr cookie sessions for server redirects
- Keep service-role key server-only
- Never expose provider secrets in frontend
- Review RLS policies
- Add rate limiting/WAF
- Add error monitoring
- Add backups and restore test

## Store operations
- Configure categories/brands
- Upload real product images
- Add variants/SKUs/stock
- Configure delivery rules
- Configure payment methods
- Configure top-up packages/providers
- Create banners
- Test returns/warranty

## SEO
- Set canonical production domain
- Add sitemap/robots
- Add OG image
- Verify Product JSON-LD
- Add Search Console/analytics if desired
