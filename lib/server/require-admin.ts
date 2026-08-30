import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from './supabase-admin';

export async function requireAdmin(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  const anon = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await anon.auth.getUser(token);
  if (error || !data.user) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };

  const db = supabaseAdmin();
  const { data: profile } = await db.from('profiles').select('role').eq('id', data.user.id).single();
  if (!profile || !['admin', 'super_admin'].includes(profile.role))
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };

  return { user: data.user, profile };
}
