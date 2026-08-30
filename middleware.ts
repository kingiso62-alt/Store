import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req:NextRequest){
  const path=req.nextUrl.pathname;
  if(!path.startsWith('/admin')) return NextResponse.next();

  // Supabase browser auth stores session in localStorage in this starter,
  // so hard server middleware cannot reliably read it without @supabase/ssr cookie auth.
  // We therefore mark admin pages as protected and redirect unauthenticated visitors
  // client-side while protected APIs enforce real role checks server-side.
  const res=NextResponse.next();
  res.headers.set('x-tokiyo-admin-protected','1');
  return res;
}

export const config={matcher:['/admin/:path*']};
