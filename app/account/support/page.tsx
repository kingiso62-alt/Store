'use client';
import { FormEvent, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabaseBrowser } from '../../../lib/supabase-browser';

function SupportContent() {
  const q = useSearchParams();
  const order = q.get('order') || '';
  const [rows, setRows] = useState<any[]>([]);
  const [msg, setMsg] = useState('');

  async function token() {
    const { data } = await supabaseBrowser.auth.getSession();
    return data.session?.access_token || '';
  }

  async function load() {
    const t = await token();
    const r = await fetch('/api/account/support', { headers: { authorization: `Bearer ${t}` } });
    const j = await r.json();
    if (r.ok) setRows(j.tickets || []);
  }

  useEffect(() => { load(); }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const t = await token();
    const r = await fetch('/api/account/support', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${t}` },
      body: JSON.stringify({
        orderId: f.get('orderId'),
        category: f.get('category'),
        subject: f.get('subject'),
        message: f.get('message')
      })
    });
    const j = await r.json();
    setMsg(r.ok ? 'Support ticket created.' : j.error);
    if (r.ok) {
      e.currentTarget.reset();
      load();
    }
  }

  return (
    <main className="wrap accountPage">
      <div className="pageHead">
        <div>
          <small>MY ACCOUNT</small>
          <h1>Support Center</h1>
        </div>
      </div>
      <div className="accountTwoCol">
        <form className="adminForm" onSubmit={submit}>
          <label>Order ID<input name="orderId" defaultValue={order} /></label>
          <label>
            Category
            <select name="category">
              <option value="topup">Top-Up</option>
              <option value="payment">Payment</option>
              <option value="accessory">Accessories</option>
              <option value="refund">Refund</option>
              <option value="general">General</option>
            </select>
          </label>
          <label>Subject<input name="subject" required /></label>
          <label>Message<textarea name="message" required /></label>
          <button className="btnBlue">OPEN TICKET</button>
          {msg && <p>{msg}</p>}
        </form>
        <div className="notificationStack">
          {rows.map((x) => (
            <div className="panel" key={x.id}>
              <small>{x.category} · {x.status}</small>
              <h3>{x.subject}</h3>
              <p>{x.message}</p>
              <small>{new Date(x.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function Support() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '40px 0', textAlign: 'center' }}>Loading Support...</div>}>
      <SupportContent />
    </Suspense>
  );
}
