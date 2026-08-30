# Customer Order Flow

## Physical accessories
Product -> Cart -> Checkout -> Payment -> Order Status -> Delivery Tracking -> Completed.

## Digital top-up
Game -> Package -> Player fields -> Cart -> Checkout -> Payment -> Live Top-Up Tracking -> Completed.

## Status screens
- `/order/status/[orderId]`
- `/topup/track/[orderId]`

Both poll for fresh status so customers do not need to manually refresh.
