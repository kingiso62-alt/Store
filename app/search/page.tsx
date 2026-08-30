'use client';
import {useEffect,useState} from 'react';
import Header from '../../components/Header';import Footer from '../../components/Footer';

export default function SearchPage(){
 const [q,setQ]=useState(''),[min,setMin]=useState(''),[max,setMax]=useState(''),[type,setType]=useState(''),[rows,setRows]=useState<any[]>([]),[loading,setLoading]=useState(false);
 async function run(){
  setLoading(true);
  const p=new URLSearchParams();
  if(q)p.set('q',q);if(min)p.set('min',min);if(max)p.set('max',max);if(type)p.set('type',type);
  const r=await fetch(`/api/catalog/search?${p.toString()}`);const j=await r.json();
  setRows(r.ok?(j.products||[]):[]);setLoading(false);
 }
 useEffect(()=>{run()},[]);
 return <><Header/><main className="wrap shopPage"><div className="pageHead public"><div><small>SEARCH</small><h1>Find Gaming Gear</h1></div></div>
  <div className="filterBar"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..."/><select value={type} onChange={e=>setType(e.target.value)}><option value="">All Types</option><option value="physical">Accessories</option><option value="digital">Top-Up</option></select><input value={min} onChange={e=>setMin(e.target.value)} type="number" placeholder="Min price"/><input value={max} onChange={e=>setMax(e.target.value)} type="number" placeholder="Max price"/><button className="btnBlue" onClick={run}>SEARCH</button></div>
  {loading?<div className="emptyState"><h2>Searching...</h2></div>:<div className="productGrid liveGrid">{rows.map((p:any)=><a className="productCard" href={`/product/${p.slug}`} key={p.id}><div className="productImg">{p.product_images?.[0]?.url?<img src={p.product_images[0].url} alt={p.name}/>:<b>TOKIYO</b>}</div><h3>{p.name}</h3><small>{p.categories?.name||p.product_type}</small><div className="price"><b>${Number(p.price).toFixed(2)}</b>{p.compare_at_price&&<del>${Number(p.compare_at_price).toFixed(2)}</del>}</div></a>)}</div>}
 </main><Footer/></>
}
