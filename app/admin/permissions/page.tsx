'use client';
import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../../lib/supabase-browser';

const permissions=['view_orders','manage_orders','manage_products','manage_inventory','manage_topups','manage_refunds','view_reports','manage_staff','manage_settings'];

export default function Permissions(){
 const [rows,setRows]=useState<any[]>([]);
 async function token(){const {data}=await supabaseBrowser.auth.getSession();return data.session?.access_token||''}
 async function load(){const t=await token();const r=await fetch('/api/admin/permissions',{headers:{authorization:`Bearer ${t}`}});const j=await r.json();if(r.ok)setRows(j.permissions||[])}
 useEffect(()=>{load()},[]);
 function allowed(role:string,p:string){return rows.find(x=>x.role===role&&x.permission===p)?.allowed||false}
 async function set(role:string,p:string,value:boolean){const t=await token();await fetch('/api/admin/permissions',{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${t}`},body:JSON.stringify({role,permission:p,allowed:value})});load()}
 return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / PERMISSIONS</small><h1>Staff Permissions</h1></div></div><div className="tableCard"><table><thead><tr><th>Permission</th><th>Staff</th><th>Admin</th></tr></thead><tbody>{permissions.map(p=><tr key={p}><td>{p}</td><td><input type="checkbox" checked={allowed('staff',p)} onChange={e=>set('staff',p,e.target.checked)}/></td><td><input type="checkbox" checked={allowed('admin',p)} onChange={e=>set('admin',p,e.target.checked)}/></td></tr>)}</tbody></table></div></main>
}
