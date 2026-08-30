'use client';
import {useState} from 'react';
export default function LiveSearch(){
 const [q,setQ]=useState(''),[rows,setRows]=useState<any[]>([]),[open,setOpen]=useState(false);
 async function run(v:string){setQ(v);if(v.trim().length<2){setRows([]);setOpen(false);return;}const r=await fetch(`/api/catalog/search?q=${encodeURIComponent(v)}`);const j=await r.json();if(r.ok){setRows((j.products||[]).slice(0,6));setOpen(true)}}
 return <div className="liveSearch"><input value={q} onChange={e=>run(e.target.value)} placeholder="Search for products..."/>{open&&<div className="searchDrop">{rows.length?rows.map(x=><a href={`/product/${x.slug}`} key={x.id}><div><b>{x.name}</b><small>{x.categories?.name||x.product_type}</small></div><strong>${Number(x.price).toFixed(2)}</strong></a>):<p>No products found.</p>}</div>}</div>
}
