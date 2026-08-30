import {NextResponse} from 'next/server';
import {requirePermission} from '../../../../lib/server/require-permission';
import {supabaseAdmin} from '../../../../lib/server/supabase-admin';

export async function GET(req:Request){
 const g=await requirePermission(req,'manage_staff');if(g.error)return g.error;
 const {data,error}=await supabaseAdmin().from('profiles').select('id,full_name,phone,role,created_at').in('role',['staff','admin','super_admin']).order('created_at',{ascending:false});
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({staff:data||[]});
}
export async function POST(req:Request){
 const g=await requirePermission(req,'manage_staff');if(g.error)return g.error;
 const b=await req.json();
 if(!['staff','admin'].includes(b.role))return NextResponse.json({error:'Invalid role'},{status:400});
 const {data,error}=await supabaseAdmin().from('profiles').update({role:b.role,full_name:b.fullName||undefined}).eq('id',b.userId).select().single();
 return error?NextResponse.json({error:error.message},{status:500}):NextResponse.json({staff:data});
}
