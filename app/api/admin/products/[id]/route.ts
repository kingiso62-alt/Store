import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../../lib/server/supabase-admin';

const db = () => supabaseAdmin();

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const b = await req.json();
    const { data, error } = await db().from('products').update(b).eq('id', id).select().single();
    if (error) throw error;
    return NextResponse.json({ product: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { error } = await db().from('products').update({ is_active: false }).eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
