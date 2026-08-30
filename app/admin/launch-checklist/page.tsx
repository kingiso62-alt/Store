'use client';
import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../../lib/supabase-browser';
export default function LaunchChecklist(){
 const [rows,setRows]=useState<any[]>([]);
 async function token(){const {data}=await supabaseBrowser.auth.getSession();return data.session?.access_token||''}
 async function load(){const t=await token();const r=await fetch('/api/admin/launch-checklist',{headers:{authorization:`Bearer ${t}`}});const j=await r.json();if(r.ok)setRows(j.checks||[])}
 useEffect(()=>{load()},[]);
 async function toggle(x:any){const t=await token();await fetch('/api/admin/launch-checklist',{method:'PATCH',headers:{'content-type':'application/json',authorization:`Bearer ${t}`},body:JSON.stringify({id:x.id,completed:!x.completed})});load()}
 const done=rows.filter(x=>x.completed).length;
 return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / LAUNCH</small><h1>Launch Checklist</h1></div><b>{done}/{rows.length} DONE</b></div><div className="panel"><div className="launchProgress"><span style={{width:`${rows.length?done/rows.length*100:0}%`}}/></div></div><div className="tableCard"><table><thead><tr><th>Done</th><th>Check</th><th>Category</th><th>Required</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td><input type="checkbox" checked={x.completed} onChange={()=>toggle(x)}/></td><td>{x.label}</td><td>{x.category}</td><td>{x.required?'Yes':'No'}</td></tr>)}</tbody></table></div></main>
}
