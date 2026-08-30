import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

async function user(req:Request){
 const token=req.headers.get('authorization')?.replace('Bearer ','');if(!token)return null;
 const {data}=await supabaseAdmin().auth.getUser(token);return data.user||null;
}
export async function GET(req:Request){
 const u=await user(req);if(!u)return NextResponse.json({error:'Unauthorized'},{status:401});
 const {data,error}=await supabaseAdmin().from('notifications').select('*').eq('user_id',u.id).order('created_at',{ascending:false}).limit(200);
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({notifications:data||[]});
}
export async function PATCH(req:Request){
 const u=await user(req);if(!u)return NextResponse.json({error:'Unauthorized'},{status:401});
 const b=await req.json();let q=supabaseAdmin().from('notifications').update({read:true}).eq('user_id',u.id);
 if(b.id)q=q.eq('id',b.id);
 const {error}=await q;return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({ok:true});
}
