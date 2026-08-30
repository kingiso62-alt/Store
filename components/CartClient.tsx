'use client';
import {useEffect,useState} from 'react';
import {getCart,saveCart} from '../lib/cart';
import type {CartItem} from '../types/store';
export default function CartClient(){
 const [items,setItems]=useState<CartItem[]>([]);
 useEffect(()=>setItems(getCart()),[]);
 function qty(i:number,n:number){const x=[...items];x[i].quantity=Math.max(1,n);setItems(x);saveCart(x)}
 function remove(i:number){const x=items.filter((_,j)=>j!==i);setItems(x);saveCart(x)}
 const subtotal=items.reduce((s,x)=>s+x.price*x.quantity,0);
 if(!items.length)return <div className="emptyState"><h2>Your cart is empty</h2><p>Add gaming gear or a top-up package to continue.</p><a href="/" className="btnBlue">SHOP NOW</a></div>;
 return <div className="cartLayout"><section className="cartItems">{items.map((x,i)=><div className="cartItem" key={x.productId+(x.variantId||'')}><div className="miniImg">{x.productType==='digital'?'T':'G'}</div><div><b>{x.name}</b><small>{x.productType==='digital'?'Digital Top-Up':'Gaming Accessory'}</small></div><strong>${(x.price*x.quantity).toFixed(2)}</strong><div className="qty"><button onClick={()=>qty(i,x.quantity-1)}>−</button><span>{x.quantity}</span><button onClick={()=>qty(i,x.quantity+1)}>+</button><button onClick={()=>remove(i)}>×</button></div></div>)}</section><aside className="summary"><h3>Order Summary</h3><p><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></p><p><span>Shipping</span><b>Calculated at checkout</b></p><hr/><p className="total"><span>Total</span><b>${subtotal.toFixed(2)}</b></p><a href="/checkout" className="btnBlue full center">CHECKOUT</a></aside></div>
}