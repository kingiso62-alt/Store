'use client';
import {useMemo,useState} from 'react';
import {addToCart} from '../../lib/cart';

export default function ProductPurchaseClient({product}:{product:any}){
 const variants=product.product_variants||[];
 const [variant,setVariant]=useState<any>(variants[0]||null);
 const [qty,setQty]=useState(1); const [msg,setMsg]=useState('');
 const price=Number(variant?.price ?? product.price);
 const stock=variant?Number(variant.stock||0):999;
 function add(){
  if(stock<qty){setMsg('Not enough stock.');return;}
  addToCart({productId:product.id,variantId:variant?.id||null,name:variant?.variant_name?`${product.name} — ${variant.variant_name}`:product.name,price,quantity:qty,productType:'physical'});
  setMsg('Added to cart.');
 }
 return <div className="purchaseBox">
   {!!variants.length&&<><b className="label">Choose Variant</b><div className="variantChips">{variants.map((v:any)=><button key={v.id} className={variant?.id===v.id?'selected':''} onClick={()=>setVariant(v)}>{v.variant_name||v.sku||'Default'} <small>{v.stock} left</small></button>)}</div></>}
   <p className={stock>0?'stock':'stock out'}>{stock>0?`● In Stock — ${stock} available`:'● Out of Stock'}</p>
   <div className="qtyRow"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><span>{qty}</span><button onClick={()=>setQty(qty+1)}>+</button><button disabled={stock<=0} onClick={add} className="btnBlue wide">ADD TO CART</button></div>
   {msg&&<p className="purchaseMsg">{msg} {msg.includes('Added')&&<a href="/cart"><b>Open cart →</b></a>}</p>}
 </div>
}
