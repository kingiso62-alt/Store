# TOKIYO STORE — Readiness Summary

## Ready in code structure
- White / Dark Blue / Dark Red storefront identity
- Gaming accessories catalog
- Digital top-up catalog
- Cart / checkout
- customer account + orders
- inventory + variants
- delivery rules
- order tracking
- returns/refunds/warranty structure
- admin dashboard
- products/categories/brands
- providers
- payment methods
- coupons
- banners
- reports
- provider health
- cron/worker
- notifications
- audit logs
- error logs
- SEO/sitemap/robots
- idempotency
- rate-limit foundation

## Requires external credentials/docs
- live Merchant API
- live Top-up API
- exact webhook signatures
- refund provider mapping
- production provider status mapping

## Recommended before launch
1. Deploy test environment.
2. Run schema + seed.
3. Configure env variables.
4. Create admin profile.
5. Test physical order.
6. Test stock reservation/release.
7. Test digital order.
8. Connect merchant sandbox.
9. Connect top-up sandbox.
10. Test duplicate callbacks and retries.
11. Security review.
12. Launch only after sandbox success.
