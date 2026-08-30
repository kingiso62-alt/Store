'use client';
import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../lib/supabase-browser';
export default function PwaTools(){
 const [prompt,setPrompt]=useState<any>(null),[msg,setMsg]=useState('');
 useEffect(()=>{if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js');const h=(e:any)=>{e.preventDefault();setPrompt(e)};window.addEventListener('beforeinstallprompt',h);return()=>window.removeEventListener('beforeinstallprompt',h)},[]);
 async function install(){if(!prompt)return setMsg('Install prompt is not available on this device yet.');await prompt.prompt();setPrompt(null)}
 async function push(){
  if(!('Notification'in window)||!('serviceWorker'in navigator))return setMsg('Push is not supported.');
  const permission=await Notification.requestPermission();if(permission!=='granted')return setMsg('Notification permission was not granted.');
  setMsg('Push permission enabled. VAPID subscription can be activated after keys are configured.');
 }
 return <div className="pwaTools"><button onClick={install}>Install TOKIYO App</button><button onClick={push}>Enable Notifications</button>{msg&&<small>{msg}</small>}</div>
}
