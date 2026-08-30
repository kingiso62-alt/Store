import { NextResponse } from 'next/server';
import { beginIdempotent, completeIdempotent } from '../../../../lib/server/idempotency';
import { supabaseAdmin } from '../../../../lib/server/supabase-admin';
import { rateLimit, clientKey } from '../../../../lib/server/rate-limit';

export async function POST(req: Request) {
  const rl = rateLimit(clientKey(req, 'payment'), 10, 60_000);
  if (!rl.ok) return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } });
  try {
    const body = await req.json();
    const { orderId, amount, customer, paymentMethod } = body;
    const idemKey = req.headers.get('x-idempotency-key') || body.idempotencyKey || `payment:${orderId}`;
    const idem = await beginIdempotent(idemKey, 'payment_create', body);
    if (idem.existing && idem.record.status === 'completed') return NextResponse.json(idem.record.response);
    if (!orderId || !amount) return NextResponse.json({ error: 'Missing orderId/amount' }, { status: 400 });

    const paymentRef = 'PAY-' + Date.now();
    let merchantResponse: any = { mode: 'placeholder' };
    try {
      const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const mr = await fetch(`${base}/api/providers/merchant/create`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ reference: paymentRef, amount: Number(amount), customer, orderId, paymentMethod }) });
      merchantResponse = await mr.json();
    } catch {}

    const db = supabaseAdmin();
    const { data, error } = await db.from('payments').insert({
      order_id: orderId,
      transaction_ref: paymentRef,
      status: 'pending',
      amount: Number(amount),
      raw_response: { customer, paymentMethod, merchantResponse }
    }).select().single();
    if (error) throw error;

    const response = { payment: data, next: { type: 'merchant_redirect_or_prompt', reference: paymentRef } };
    await completeIdempotent(idemKey, 'payment_create', response);
    return NextResponse.json(response);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Payment create failed' }, { status: 500 });
  }
}