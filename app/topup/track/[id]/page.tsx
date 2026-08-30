'use client';
import {useEffect,useState} from 'react';
export default function TopupTrack({params}:{params:Promise<{id:string}>}){
 const [id,setId]=useState(''),[rows,setRows]=useState<any[]>([]);
 useEffect(()=>{params.then(x=>setId(x.id))},[params]);
 useEffect(()=>{if(!id)return;const load=async()=>{const r=await fetch(`/api/topup/track/${id}`,{cache:'no-store'});const j=await r.json();if(r.ok)setRows(j.topups||[])};load();const t=setInterval(load,6000);return()=>clearInterval(t)},[id]);
 return <main className="wrap statusPage"><small>LIVE TOP-UP</small><h1>Top-Up Tracking</h1><p>This page refreshes automatically.</p><div className="notificationStack">{rows.map(x=><div className="panel" key={x.id}><small>{x.order_items?.products?.name}</small><h3>{x.topup_packages?.package_name}</h3><p>Status: <b>{x.status}</b></p><p>Provider: {x.api_providers?.name||'Assigning provider...'}</p><p>Attempts: {x.attempts||0}</p>{x.provider_order_id&&<small>Provider Ref: {x.provider_order_id}</small>}</div>)}</div></main>
}
