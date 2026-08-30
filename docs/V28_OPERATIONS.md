# TOKIYO STORE V28 Operations

## Added
- System Health dashboard
- Hourly system health snapshots
- CSV export endpoints for orders, top-ups and products
- Customer Security page
- Global sign-out action
- Security event history

## Security
The global sign-out endpoint uses Supabase Admin and therefore must remain server-side.

## Exports
CSV exports are permission protected. They are intended for admin reporting/backups, not public use.
