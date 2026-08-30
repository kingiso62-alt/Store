'use client';
import {useEffect,useState} from 'react';
export default function OrderStatus({params}:{params:Promise<{id:string}>}){
 const [id,setId]=useState(''),[d,setD]=useState<any>(null),[err,setErr]=useState('');
 useEffect(()=>{params.then(x=>setId(x.id))},[params]);
 useEffect(()=>{if(!id)return;let timer:any;const load=async()=>{const r=await fetch(`/api/orders/${id}/status`,{cache:'no-store'});const j=await r.json();if(r.ok)setD(j);else setErr(j.error)};load();timer=setInterval(load,8000);return()=>clearInterval(timer)},[id]);
 if(err)return <main className="wrap emptyState"><h2>{err}</h2></main>;
 if(!d)return <main className="wrap emptyState"><h2>Checking order...</h2></main>;
 const stages=['pending','paid','confirmed','preparing','out_for_delivery','delivered','completed'];
 const idx=stages.indexOf(d.order.status);
 return <main className="wrap statusPage"><small>ORDER STATUS</small><h1>{d.order.order_number}</h1><p>Updates automatically every few seconds.</p><div className="statusTimeline">{stages.map((s,i)=><div className={i<=idx?'done':''} key={s}><span>{i<idx?'✓':i===idx?'●':'○'}</span><b>{s.replaceAll('_',' ')}</b></div>)}</div><div className="panel"><h3>Payment</h3>{d.payments.length?d.payments.map((p:any,i:number)=><p key={i}>{p.status} {p.transaction_ref&&`— ${p.transaction_ref}`}</p>):<p>Waiting for payment information.</p>}</div>{d.order.order_type==='digital'&&<a className="btnBlue" href={`/topup/track/${d.order.id}`}>TRACK TOP-UP</a>}</main>
}
