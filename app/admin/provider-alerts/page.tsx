'use client';
import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../../lib/supabase-browser';
export default function ProviderAlerts(){
 const [rows,setRows]=useState<any[]>([]);
 async function token(){const {data}=await supabaseBrowser.auth.getSession();return data.session?.access_token||''}
 async function load(){const t=await token();const r=await fetch('/api/admin/provider-alerts',{headers:{authorization:`Bearer ${t}`}});const j=await r.json();if(r.ok)setRows(j.alerts||[])}
 useEffect(()=>{load()},[]);
 async function ack(id:string){const t=await token();await fetch('/api/admin/provider-alerts',{method:'PATCH',headers:{'content-type':'application/json',authorization:`Bearer ${t}`},body:JSON.stringify({id,acknowledged:true})});load()}
 return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / PROVIDER ALERTS</small><h1>Provider Alerts</h1></div></div><div className="tableCard"><table><thead><tr><th>Provider</th><th>Type</th><th>Severity</th><th>Message</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td>{x.api_providers?.name}</td><td>{x.alert_type}</td><td>{x.severity}</td><td>{x.message}</td><td>{x.acknowledged?'Acknowledged':'Open'}</td><td>{!x.acknowledged&&<button onClick={()=>ack(x.id)}>Acknowledge</button>}</td></tr>)}</tbody></table></div></main>
}
