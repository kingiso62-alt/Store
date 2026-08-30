import {supabaseAdmin} from './supabase-admin';

export async function beginIdempotent(key:string,scope:string,payload:any){
 const db=supabaseAdmin();
 const {data:existing}=await db.from('idempotency_keys').select('*').eq('key',key).eq('scope',scope).maybeSingle();
 if(existing)return {existing:true,record:existing};
 const {data,error}=await db.from('idempotency_keys').insert({key,scope,payload,status:'processing'}).select().single();
 if(error)throw error;
 return {existing:false,record:data};
}

export async function completeIdempotent(key:string,scope:string,response:any,status='completed'){
 await supabaseAdmin().from('idempotency_keys').update({response,status,completed_at:new Date().toISOString()}).eq('key',key).eq('scope',scope);
}
