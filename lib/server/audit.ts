import {supabaseAdmin} from './supabase-admin';
export async function writeAudit(actorId:string|undefined|null,action:string,entityType?:string,entityId?:string,metadata:any={}){
 try{
  await supabaseAdmin().from('audit_logs').insert({
    actor_id:actorId||null,action,entity_type:entityType||null,entity_id:entityId||null,metadata
  });
 }catch{}
}
