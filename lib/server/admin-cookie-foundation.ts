// Production migration note:
// Replace browser-localStorage-only Supabase auth with @supabase/ssr cookie sessions.
// Then use createServerClient in middleware and server layouts to enforce admin routes before render.
// Current protected admin APIs remain authoritative and safe; this file documents the intended upgrade point.
export const ADMIN_SSR_MIGRATION_READY = true;
