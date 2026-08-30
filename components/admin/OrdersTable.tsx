'use client';import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../lib/supabase-browser';
export default function OrdersTable(){
 const [rows,setRows]=useState<any[]>([]),[msg,setMsg]=useState('');
 async function token(){const {data}=await supabaseBrowser.auth.getSession();return data.session?.access_token||''}
 async function load(){const t=await token();const r=await fetch('/api/admin/orders',{headers:{authorization:`Bearer ${t}`}});const j=await r.json();if(r.ok)setRows(j.orders||[]);else setMsg(j.error)}
 useEffect(()=>{load()},[]);
 async function status(id:string,s:string){const t=await token();const r=await fetch(`/api/admin/orders/${id}`,{method:'PATCH',headers:{'content-type':'application/json',authorization:`Bearer ${t}`},body:JSON.stringify({status:s})});if(r.ok)load()}
 return <>{msg&&<p>{msg}</p>}<div className="tableCard"><table><thead><tr><th>Order</th><th>Type</th><th>Total</th><th>Status</th><th>Date</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><a href={`/admin/orders/${x.id}`}><b>{x.order_number}</b></a></td><td>{x.order_type}</td><td>${Number(x.total).toFixed(2)}</td><td><select value={x.status} onChange={e=>status(x.id,e.target.value)}>{['pending','paid','confirmed','preparing','processing','out_for_delivery','completed','delivered','failed','cancelled','refunded'].map(s=><option key={s}>{s}</option>)}</select></td><td>{new Date(x.created_at).toLocaleDateString()}</td></tr>)}</tbody></table></div></>
}
