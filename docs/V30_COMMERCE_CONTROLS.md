# V30 Commerce Controls

## Coupons
Admin can create percentage or fixed-value coupon codes with minimum orders, usage limits, expiry, and enable/disable state.

## Refund workflow
Customer requests refund -> Admin reviews -> approved/rejected -> processing -> refunded.

The V30 workflow records state. Provider-specific automatic merchant refund execution must only be connected after the real merchant API's refund endpoint and signature rules are known.

## Fraud review
An hourly rules-based scan flags unusual order velocity and hourly order value. This is a review aid, not an automatic accusation or payment block.
