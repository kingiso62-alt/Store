'use client';
import {FormEvent,useEffect,useState} from 'react';
import {supabaseBrowser} from '../../../lib/supabase-browser';

export default function TopupPackages(){
 const [rows,setRows]=useState<any[]>([]),[products,setProducts]=useState<any[]>([]),[providers,setProviders]=useState<any[]>([]),[msg,setMsg]=useState('');
 async function token(){const {data}=await supabaseBrowser.auth.getSession();return data.session?.access_token||''}
 async function load(){
  const t=await token();
  const [r,pv,pr]=await Promise.all([
    fetch('/api/admin/topup-packages',{headers:{authorization:`Bearer ${t}`}}),
    fetch('/api/catalog/products?type=digital'),
    fetch('/api/admin/providers',{headers:{authorization:`Bearer ${t}`}})
  ]);
  const [j,jp,jr]=await Promise.all([r.json(),pv.json(),pr.json()]);
  if(r.ok)setRows(j.packages||[]);else setMsg(j.error);
  if(pv.ok)setProducts(jp.products||[]);
  if(pr.ok)setProviders((jr.providers||[]).filter((x:any)=>x.provider_type==='topup'));
 }
 useEffect(()=>{load()},[]);

 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();const f=new FormData(e.currentTarget),t=await token();
  const r=await fetch('/api/admin/topup-packages',{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${t}`},body:JSON.stringify({
    productId:f.get('productId'),providerId:f.get('providerId'),providerProductCode:f.get('code'),
    packageName:f.get('packageName'),cost:f.get('cost'),price:f.get('price')
  })});
  const j=await r.json();setMsg(r.ok?'Top-up package added.':j.error);if(r.ok){e.currentTarget.reset();load()}
 }
 async function toggle(x:any){
  const t=await token();
  await fetch(`/api/admin/topup-packages/${x.id}`,{method:'PATCH',headers:{'content-type':'application/json',authorization:`Bearer ${t}`},body:JSON.stringify({is_active:!x.is_active})});load();
 }
 async function del(id:string){if(!confirm('Delete package?'))return;const t=await token();await fetch(`/api/admin/topup-packages/${id}`,{method:'DELETE',headers:{authorization:`Bearer ${t}`}});load()}

 return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / TOP-UP</small><h1>Top-Up Packages</h1></div></div>
 <div className="providerLayout"><form className="adminForm" onSubmit={submit}>
  <label>Digital Product<select name="productId" required><option value="">Select product</option>{products.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
  <label>Provider<select name="providerId" required><option value="">Select provider</option>{providers.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></label>
  <label>Package Name<input name="packageName" placeholder="600 UC" required/></label>
  <label>Provider Product Code<input name="code" required/></label>
  <div className="two"><label>Provider Cost<input name="cost" type="number" step="0.01"/></label><label>Selling Price<input name="price" type="number" step="0.01" required/></label></div>
  <button className="btnBlue">ADD PACKAGE</button>{msg&&<p>{msg}</p>}
 </form>
 <div className="tableCard"><table><thead><tr><th>Product</th><th>Package</th><th>Provider</th><th>Cost</th><th>Price</th><th>Status</th><th>Action</th></tr></thead>
 <tbody>{rows.map(x=><tr key={x.id}><td>{x.products?.name}</td><td>{x.package_name}</td><td>{x.api_providers?.name}</td><td>${Number(x.cost||0).toFixed(2)}</td><td>${Number(x.price).toFixed(2)}</td><td>{x.is_active?'Active':'Disabled'}</td><td><button onClick={()=>toggle(x)}>{x.is_active?'Disable':'Enable'}</button> <button onClick={()=>del(x.id)}>Delete</button></td></tr>)}</tbody></table></div></div></main>
}
