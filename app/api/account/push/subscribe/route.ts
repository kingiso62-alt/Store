import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '../../../../../lib/server/supabase-admin';

export async function POST(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  const anon = createClient(supabaseUrl, supabaseAnonKey);
  const { data: u } = await anon.auth.getUser(token);
  if (!u.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const sub = await req.json();
    const { data, error } = await supabaseAdmin().from('push_subscriptions').upsert({
      user_id: u.user.id,
      endpoint: sub.endpoint,
      p256dh: sub.keys?.p256dh || null,
      auth: sub.keys?.auth || null,
      user_agent: req.headers.get('user-agent') || null
    }, { onConflict: 'endpoint' }).select().single();

    return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json({ subscription: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
