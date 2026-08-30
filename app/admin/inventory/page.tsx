'use client';
import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../../lib/supabase-browser';
export default function Inventory(){
 const [rows,setRows]=useState<any[]>([]),[msg,setMsg]=useState('');
 async function token(){const {data}=await supabaseBrowser.auth.getSession();return data.session?.access_token||''}
 async function load(){const t=await token();const r=await fetch('/api/admin/inventory',{headers:{authorization:`Bearer ${t}`}});const j=await r.json();if(r.ok)setRows(j.inventory||[]);else setMsg(j.error)}
 useEffect(()=>{load()},[]);
 async function adjust(id:string,qty:number){const t=await token();const r=await fetch('/api/admin/inventory',{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${t}`},body:JSON.stringify({variantId:id,quantity:qty,note:'Quick admin adjustment'})});const j=await r.json();setMsg(r.ok?'Stock updated.':j.error);if(r.ok)load()}
 return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / INVENTORY</small><h1>Inventory</h1></div></div>{msg&&<p>{msg}</p>}<div className="tableCard"><table><thead><tr><th>Product</th><th>Variant</th><th>SKU</th><th>Stock</th><th>Adjust</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td>{x.products?.name}</td><td>{x.variant_name||'Default'}</td><td>{x.sku||'-'}</td><td>{x.stock}</td><td><button onClick={()=>adjust(x.id,1)}>+1</button> <button onClick={()=>adjust(x.id,-1)}>-1</button></td></tr>)}</tbody></table></div></main>
}
