'use client';
import {useEffect} from 'react';import {supabaseBrowser} from '../../lib/supabase-browser';
export default function CartSnapshotSync(){
 useEffect(()=>{let timer:any;async function sync(){try{const raw=localStorage.getItem('tokiyo_cart')||localStorage.getItem('cart')||'[]';const items=JSON.parse(raw);const {data}=await supabaseBrowser.auth.getSession();const t=data.session?.access_token;if(!t)return;await fetch('/api/account/cart-snapshot',{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${t}`},body:JSON.stringify({items})})}catch{}}
 sync();timer=setInterval(sync,30000);window.addEventListener('storage',sync);return()=>{clearInterval(timer);window.removeEventListener('storage',sync)}} ,[]);
 return null;
}
