'use client';
import {useEffect,useState} from 'react';import {supabaseBrowser} from '../../../lib/supabase-browser';

export default function Errors(){
 const [rows,setRows]=useState<any[]>([]),[msg,setMsg]=useState('');
 useEffect(()=>{(async()=>{
  const {data}=await supabaseBrowser.auth.getSession();
  const r=await fetch('/api/admin/errors',{headers:{authorization:`Bearer ${data.session?.access_token||''}`}});
  const j=await r.json();if(r.ok)setRows(j.errors||[]);else setMsg(j.error);
 })()},[]);
 return <main className="adminStandalone"><div className="pageHead"><div><small>ADMIN / ERRORS</small><h1>Error Logs</h1></div></div>{msg&&<p>{msg}</p>}<div className="tableCard"><table><thead><tr><th>Severity</th><th>Source</th><th>Message</th><th>Route</th><th>Date</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td>{x.severity}</td><td>{x.source}</td><td>{x.message}</td><td>{x.route||'-'}</td><td>{new Date(x.created_at).toLocaleString()}</td></tr>)}</tbody></table></div></main>
}
