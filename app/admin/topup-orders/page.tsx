'use client';
import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../../lib/supabase-browser';
export default function TopupOrders(){
 const [rows,setRows]=useState<any[]>([]),[status,setStatus]=useState('');
 async function load(){const {data}=await supabaseBrowser.auth.getSession();const p=status?`?status=${status}`:'';const r=await fetch('/api/admin/topup-orders'+p,{headers:{authorization:`Bearer ${data.session?.access_token||''}`}});const j=await r.json();if(r.ok)setRows(j.orders||[])}
 useEffect(()=>{load()},[status]);
 return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / TOP-UP OPS</small><h1>Top-Up Orders</h1></div><select value={status} onChange={e=>setStatus(e.target.value)}><option value="">All Statuses</option><option>queued</option><option>processing</option><option>completed</option><option>failed</option><option>retry</option></select></div><div className="tableCard"><table><thead><tr><th>Product</th><th>Package</th><th>Provider</th><th>Status</th><th>Attempts</th><th>Cost</th><th>Sell</th><th>Date</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td>{x.order_items?.products?.name||'-'}</td><td>{x.topup_packages?.package_name||'-'}</td><td>{x.api_providers?.name||'-'}</td><td>{x.status}</td><td>{x.attempts||0}</td><td>${Number(x.request_payload?.costSnapshot??x.topup_packages?.cost??0).toFixed(2)}</td><td>${Number(x.request_payload?.sellPrice??x.topup_packages?.price??0).toFixed(2)}</td><td>{new Date(x.created_at).toLocaleString()}</td></tr>)}</tbody></table></div></main>
}
