'use client';
import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../lib/supabase-browser';
export default function DashboardClient(){
 const [data,setData]=useState<any>(null),[err,setErr]=useState('');
 useEffect(()=>{(async()=>{const {data:s}=await supabaseBrowser.auth.getSession();const t=s.session?.access_token||'';const r=await fetch('/api/admin/dashboard',{headers:{authorization:`Bearer ${t}`}});const j=await r.json();if(r.ok)setData(j);else setErr(j.error)})()},[]);
 if(err)return <div className="panel"><b>{err}</b><p>Sign in with an admin or super-admin account.</p></div>;
 if(!data)return <div className="panel">Loading dashboard...</div>;
 const m=data.metrics;
 return <><div className="metricGrid"><div><small>TOTAL REVENUE</small><b>${Number(m.revenue).toFixed(2)}</b></div><div><small>RECENT ACCESSORIES</small><b>${Number(m.recentPhysicalRevenue).toFixed(2)}</b></div><div><small>RECENT TOP-UP</small><b>${Number(m.recentDigitalRevenue).toFixed(2)}</b></div><div><small>RECENT ORDERS</small><b>{m.totalOrders}</b></div></div><div className="adminBottom"><div className="panel"><h3>Store</h3><p>Products <b>{m.productCount}</b></p><p>Customers <b>{m.customerCount}</b></p></div><div className="panel"><h3>Low Stock</h3>{data.lowStock.slice(0,5).map((x:any)=><p key={x.id}>{x.products?.name} <b>{x.stock}</b></p>)}</div><div className="panel"><h3>Recent Orders</h3>{data.recentOrders.slice(0,5).map((x:any)=><p key={x.id}>{x.status} — ${Number(x.total).toFixed(2)}</p>)}</div></div></>
}
