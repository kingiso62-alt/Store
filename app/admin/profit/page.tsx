'use client';
import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../../lib/supabase-browser';
export default function Profit(){
 const [data,setData]=useState<any>(null);
 useEffect(()=>{(async()=>{const {data:s}=await supabaseBrowser.auth.getSession();const r=await fetch('/api/admin/profit',{headers:{authorization:`Bearer ${s.session?.access_token||''}`}});const j=await r.json();if(r.ok)setData(j)})()},[]);
 if(!data)return <main className="adminStandalone">Loading profit report...</main>;
 const s=data.summary;
 return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / PROFIT</small><h1>Profit & Margin</h1></div></div><div className="metricGrid"><div><small>REVENUE</small><b>${s.revenue.toFixed(2)}</b></div><div><small>COST</small><b>${s.cost.toFixed(2)}</b></div><div><small>PROFIT</small><b>${s.profit.toFixed(2)}</b></div><div><small>MARGIN</small><b>{s.margin.toFixed(1)}%</b></div></div><div className="adminBottom"><div className="panel"><h3>Accessories Profit</h3><b>${s.physicalProfit.toFixed(2)}</b></div><div className="panel"><h3>Top-Up Profit</h3><b>${s.digitalProfit.toFixed(2)}</b></div><div className="panel"><h3>Tracked Items</h3><b>{data.items.length}</b></div></div></main>
}
