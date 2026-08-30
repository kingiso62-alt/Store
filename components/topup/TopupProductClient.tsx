'use client';
import {useState} from 'react';import {addToCart} from '../../lib/cart';

export default function TopupProductClient({product,packages,fields}:{product:any,packages:any[],fields:any[]}){
  const [pkg,setPkg]=useState<any>(packages[0]||null),[values,setValues]=useState<any>({}),[msg,setMsg]=useState('');
  function set(name:string,value:string){setValues((v:any)=>({...v,[name]:value}))}
  function add(){
    if(!pkg)return setMsg('No package is available.');
    for(const f of fields||[])if(f.required&&!String(values[f.name]||'').trim())return setMsg(`${f.label} is required.`);
    addToCart({productId:product.id,name:`${product.name} — ${pkg.package_name}`,price:Number(pkg.price),quantity:1,productType:'digital',playerData:{...values,packageId:pkg.id,packageName:pkg.package_name}});
    setMsg('Top-up added to cart.');
  }
  return <div className="topupProductGrid"><section className="panel"><h2>{product.name}</h2><p>{product.description||'Instant game top-up.'}</p>{(fields||[]).map((f:any)=><label className="topupLabel" key={f.name}>{f.label}{!f.required&&<small> (optional)</small>}<input value={values[f.name]||''} onChange={e=>set(f.name,e.target.value)} placeholder={f.label}/></label>)}</section><section className="panel"><h3>Select Package</h3><div className="packageGrid">{packages.map((x:any)=><button key={x.id} className={pkg?.id===x.id?'selected':''} onClick={()=>setPkg(x)}><b>{x.package_name}</b><span>${Number(x.price).toFixed(2)}</span></button>)}</div><button className="btnBlue full" onClick={add}>ADD TO CART</button>{msg&&<p className="purchaseMsg">{msg} {msg.includes('added')&&<a href="/cart"><b>Open cart →</b></a>}</p>}</section></div>
}
