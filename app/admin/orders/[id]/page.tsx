'use client';
import {useEffect,useState} from 'react';
import {supabaseBrowser} from '../../../../lib/supabase-browser';

export default function AdminOrderDetail({params}:{params:Promise<{id:string}>}){
 const [id,setId]=useState(''),[data,setData]=useState<any>(null),[msg,setMsg]=useState('');
 useEffect(()=>{params.then(x=>setId(x.id))},[params]);
 useEffect(()=>{if(!id)return;(async()=>{
  const {data:s}=await supabaseBrowser.auth.getSession();
  const r=await fetch(`/api/admin/orders/${id}/detail`,{headers:{authorization:`Bearer ${s.session?.access_token||''}`}});
  const j=await r.json();if(r.ok)setData(j);else setMsg(j.error);
 })()},[id]);
 if(msg)return <main className="adminStandalone"><p>{msg}</p></main>;
 if(!data)return <main className="adminStandalone">Loading order...</main>;
 const o=data.order;
 return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / ORDER</small><h1>{o.order_number}</h1></div><a className="btnBlue" href={`/admin/orders/${o.id}/delivery`}>DELIVERY TIMELINE</a></div>
 <div className="orderDetailGrid">
  <section className="panel"><h3>Order Summary</h3><p>Status <b>{o.status}</b></p><p>Type <b>{o.order_type}</b></p><p>Total <b>${Number(o.total).toFixed(2)}</b></p><p>Created <b>{new Date(o.created_at).toLocaleString()}</b></p></section>
  <section className="panel"><h3>Delivery</h3><pre>{JSON.stringify(o.delivery_address||{},null,2)}</pre></section>
 </div>
 <div className="panel orderDetailPanel"><h3>Items</h3>{(o.order_items||[]).map((x:any)=><p key={x.id}><span>{x.products?.name} {x.product_variants?.variant_name?`— ${x.product_variants.variant_name}`:''} × {x.quantity}</span><b>${(Number(x.unit_price)*x.quantity).toFixed(2)}</b></p>)}</div>
 <div className="orderDetailGrid">
  <section className="panel"><h3>Payments</h3>{(data.payments||[]).map((x:any)=><p key={x.id}>{x.transaction_ref} <b>{x.status}</b></p>)}</section>
  <section className="panel"><h3>Top-Up API Orders</h3>{(data.apiOrders||[]).map((x:any)=><p key={x.id}>{x.api_providers?.name||'Provider'} <b>{x.status}</b></p>)}</section>
 </div></main>
}
