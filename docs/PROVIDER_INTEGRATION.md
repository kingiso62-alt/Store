# Provider Integration Guide

## Merchant Provider
Update:
- `app/api/providers/merchant/create/route.ts`
- `app/api/providers/merchant/refund/route.ts`
- `app/api/internal/webhook/merchant/route.ts`

Map:
- auth headers
- amount format
- currency
- customer phone format
- callback/webhook URL
- success/pending/failed states
- refund request/response
- webhook signature algorithm

## Top-Up Provider
Update:
- `app/api/providers/topup/order/route.ts`
- `app/api/providers/topup/status/route.ts`

Map:
- product/package code
- player/account ID fields
- server/zone fields
- provider order ID
- completed/processing/failed states
- insufficient balance/out-of-stock errors

## Sandbox tests required
1. Successful payment
2. Failed payment
3. Duplicate callback
4. Payment timeout
5. Successful top-up
6. Top-up pending
7. Top-up provider failure
8. Fallback provider
9. Refund
10. Duplicate fulfillment protection
