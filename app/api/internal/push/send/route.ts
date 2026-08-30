import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
 if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)
  return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const {userId,title,body}=await req.json();
  const {data,error}=await supabaseAdmin().from('push_subscriptions').select('*').eq('user_id',userId);
  if(error)throw error;
  // Real Web Push encryption/signing requires VAPID implementation/package.
  // This endpoint is the integration point and returns queued subscriptions for now.
  return NextResponse.json({queued:(data||[]).length,title,body,subscriptions:data||[]});
 }catch(e:any){
  return NextResponse.json({error:e.message},{status:500});
 }
}
