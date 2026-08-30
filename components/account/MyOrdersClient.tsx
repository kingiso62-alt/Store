'use client';
import {useEffect,useState} from 'react';
import {supabaseBrowser} from '../../lib/supabase-browser';

export default function MyOrdersClient(){
 const [orders,setOrders]=useState<any[]>([]),[msg,setMsg]=useState('');
 useEffect(()=>{(async()=>{
  const {data}=await supabaseBrowser.auth.getSession();
  if(!data.session){location.href='/login';return;}
  const r=await fetch('/api/account/orders',{headers:{authorization:`Bearer ${data.session.access_token}`}});
  const j=await r.json(); if(r.ok)setOrders(j.orders||[]); else setMsg(j.error);
 })()},[]);
 if(msg)return <div className="emptyState"><h2>{msg}</h2></div>;
 if(!orders.length)return <div className="emptyState"><h2>No orders yet</h2><p>Your accessory and top-up orders will appear here.</p><a className="btnBlue" href="/shop">SHOP NOW</a></div>;
 return <div className="myOrders">{orders.map(o=><article className="orderCard" key={o.id}>
  <div className="orderCardHead"><div><small>ORDER</small><b>{o.order_number}</b></div><div><small>STATUS</small><b className="statusPill">{o.status}</b></div><div><small>TOTAL</small><b>${Number(o.total).toFixed(2)}</b></div></div>
  <div className="orderItems">{(o.order_items||[]).map((x:any,i:number)=><p key={i}><span>{x.products?.name} × {x.quantity}</span><b>${(Number(x.unit_price)*x.quantity).toFixed(2)}</b></p>)}</div>
  <div className="orderActions"><a href={`/account/orders/${o.id}`}>View Timeline</a><a href="/track-order">Track Order</a>{o.order_type==='physical'&&<a href="/returns">Request Return</a>}</div>
 </article>)}</div>
}
