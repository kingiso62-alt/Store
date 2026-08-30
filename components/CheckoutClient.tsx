'use client';
import {FormEvent,useEffect,useState} from 'react';
import {getCart,clearCart} from '../lib/cart';
import {supabaseBrowser} from '../lib/supabase-browser';
import type {CartItem} from '../types/store';
import PaymentMethodSelector from './checkout/PaymentMethodSelector';
export default function CheckoutClient(){
 const [items,setItems]=useState<CartItem[]>([]);const [msg,setMsg]=useState('');const [couponCode,setCouponCode]=useState('');const [discount,setDiscount]=useState(0);
 useEffect(()=>setItems(getCart()),[]);
 const subtotal=items.reduce((s,x)=>s+x.price*x.quantity,0);
 const physical=items.some(x=>x.productType==='physical'); const shipping=physical?5:0; const total=Math.max(0,subtotal+shipping-discount);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault(); if(!items.length)return setMsg('Your cart is empty.');
  setMsg('Creating order...'); const f=new FormData(e.currentTarget);
  const {data}=await supabaseBrowser.auth.getUser();
  const deliveryAddress=physical?{fullName:f.get('name'),phone:f.get('phone'),city:f.get('city'),district:f.get('district'),address:f.get('address'),notes:f.get('notes')}:null;
  const orderKey=crypto.randomUUID();
  const r=await fetch('/api/orders',{method:'POST',headers:{'content-type':'application/json','x-idempotency-key':orderKey},body:JSON.stringify({userId:data.user?.id||null,items,deliveryAddress,shipping,discount,idempotencyKey:orderKey})});
  const j=await r.json(); if(!r.ok)return setMsg(j.error||'Order failed');
  const payKey=`payment:${j.order.id}`;
  const p=await fetch('/api/payments/create',{method:'POST',headers:{'content-type':'application/json','x-idempotency-key':payKey},body:JSON.stringify({orderId:j.order.id,amount:j.order.total,customer:{phone:f.get('phone')},paymentMethod:f.get('paymentMethod'),idempotencyKey:payKey})});
  const pj=await p.json(); if(!p.ok)return setMsg(pj.error||'Payment initialization failed');
  clearCart(); setItems([]); setMsg(`Order ${j.order.order_number} created. Payment reference: ${pj.payment.transaction_ref}`);
 }
 return <form onSubmit={submit} className="checkoutLayout"><section className="formCard"><h2>{physical?'Shipping Information':'Customer Information'}</h2><label>Full Name<input name="name" required/></label><label>Phone Number<input name="phone" required/></label>{physical&&<><div className="two"><label>City<input name="city" defaultValue="Mogadishu" required/></label><label>District<input name="district" required/></label></div><label>Address<input name="address" required/></label><label>Delivery Notes<textarea name="notes"/></label></>}<div className="couponBox"><input value={couponCode} onChange={e=>setCouponCode(e.target.value)} placeholder="Coupon code"/><button type="button" onClick={async()=>{const r=await fetch('/api/coupons/validate',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({code:couponCode,subtotal})});const j=await r.json();if(r.ok){setDiscount(Number(j.discount||0));setMsg('Coupon applied.')}else setMsg(j.error)}}>APPLY</button></div><PaymentMethodSelector/><button className="btnBlue full">PLACE ORDER & CONTINUE TO PAYMENT</button>{msg&&<p className="checkoutMsg">{msg}</p>}</section><aside className="summary"><h3>Order Summary</h3>{items.map(x=><p key={x.productId}><span>{x.name} ×{x.quantity}</span><b>${(x.price*x.quantity).toFixed(2)}</b></p>)}<hr/><p><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></p><p><span>Shipping</span><b>${shipping.toFixed(2)}</b></p><p><span>Discount</span><b>-${discount.toFixed(2)}</b></p><p className="total"><span>Total</span><b>${total.toFixed(2)}</b></p></aside></form>
}