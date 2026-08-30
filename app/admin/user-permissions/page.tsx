'use client';
import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../../lib/supabase-browser';

const perms=['view_orders','manage_orders','manage_products','manage_inventory','manage_topups','manage_refunds','view_reports','manage_staff','manage_settings'];

export default function UserPermissions(){
  const [staff,setStaff]=useState<any[]>([]),[overrides,setOverrides]=useState<any[]>([]),[selected,setSelected]=useState('');
  async function token(){const {data}=await supabaseBrowser.auth.getSession();return data.session?.access_token||''}
  async function load(){const t=await token();const r=await fetch('/api/admin/user-permissions',{headers:{authorization:`Bearer ${t}`}});const j=await r.json();if(r.ok){setStaff(j.staff||[]);setOverrides(j.overrides||[]);if(!selected&&j.staff?.[0])setSelected(j.staff[0].id)}}
  useEffect(()=>{load()},[]);
  function value(p:string){const x=overrides.find(o=>o.user_id===selected&&o.permission===p);return x?x.allowed:null}
  async function set(p:string,allowed:boolean){const t=await token();await fetch('/api/admin/user-permissions',{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${t}`},body:JSON.stringify({userId:selected,permission:p,allowed})});load()}
  return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / USER PERMISSIONS</small><h1>User Permission Overrides</h1></div></div><div className="panel"><label>Staff User<select value={selected} onChange={e=>setSelected(e.target.value)}>{staff.map(x=><option key={x.id} value={x.id}>{x.full_name||x.id} — {x.role}</option>)}</select></label></div><div className="tableCard"><table><thead><tr><th>Permission</th><th>Override</th></tr></thead><tbody>{perms.map(p=><tr key={p}><td>{p}</td><td><select value={value(p)===null?'inherit':value(p)?'allow':'deny'} onChange={e=>e.target.value==='inherit'?null:set(p,e.target.value==='allow')}><option value="inherit">Inherit Role</option><option value="allow">Allow</option><option value="deny">Deny</option></select></td></tr>)}</tbody></table></div></main>
}
