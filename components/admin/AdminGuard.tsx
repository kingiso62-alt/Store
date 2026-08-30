'use client';
import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../lib/supabase-browser';
export default function AdminGuard({children}:{children:React.ReactNode}){
 const [ok,setOk]=useState<boolean|null>(null);
 useEffect(()=>{(async()=>{
   try{
     const sr=await fetch('/api/admin/session',{cache:'no-store'});
     if(sr.ok){
       const sj=await sr.json();
       if(sj.authorized){setOk(true);return;}
     }
   }catch{}
   const {data}=await supabaseBrowser.auth.getSession();
   if(!data.session){location.href='/login';return;}
   const r=await fetch('/api/admin/dashboard',{headers:{authorization:`Bearer ${data.session.access_token}`}});
   if(r.status===403||r.status===401){location.href='/account';return;}
   setOk(true);
 })()},[]);
 if(ok!==true)return <div className="adminGuardLoading">Checking admin access...</div>;
 return <>{children}</>;
}
