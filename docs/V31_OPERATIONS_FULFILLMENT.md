# V31 Fulfillment & Operations

## Physical accessories
- Customer delivery addresses
- Shipping zones
- Shipping quote API
- Free-shipping thresholds
- ETA ranges
- Low/out-of-stock visibility
- Inventory alert worker

## Data safety
A daily metadata integrity snapshot records key table counts.

This is deliberately NOT described as a database backup. Production database recovery must use Supabase's actual backup/PITR features according to the selected Supabase plan.
