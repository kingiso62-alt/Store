'use client';
import {FormEvent,useState} from 'react';
import Header from '../../components/Header'; import Footer from '../../components/Footer';
import {supabaseBrowser} from '../../lib/supabase-browser';
export default function Register(){
 const [msg,setMsg]=useState('');
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault(); const f=new FormData(e.currentTarget);
  const email=String(f.get('email')),password=String(f.get('password')),full_name=String(f.get('name'));
  const {data,error}=await supabaseBrowser.auth.signUp({email,password,options:{data:{full_name}}});
  if(error)return setMsg(error.message); setMsg(data.session?'Account created.':'Account created. Check your email to confirm.');
 }
 return <><Header/><main className="wrap authPage"><form className="authCard" onSubmit={submit}><h1>Create Account</h1><p>Join TOKIYO STORE to manage orders and top-ups.</p><label>Full Name<input name="name" required/></label><label>Email<input name="email" type="email" required/></label><label>Password<input name="password" type="password" minLength={8} required/></label><button className="btnBlue full">CREATE ACCOUNT</button>{msg&&<small className="authMsg">{msg}</small>}</form></main><Footer/></>
}