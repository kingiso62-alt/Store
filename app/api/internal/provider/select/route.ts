import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
 if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)
  return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const {productId,packageCode}=await req.json();
  const db=supabaseAdmin();
  let q=db.from('topup_packages')
   .select('id,product_id,provider_id,provider_product_code,cost,price,is_active,api_providers(id,name,is_active,priority,config)')
   .eq('is_active',true);
  if(productId) q=q.eq('product_id',productId);
  if(packageCode) q=q.eq('provider_product_code',packageCode);
  const {data,error}=await q;
  if(error)throw error;

  const candidates=(data||[])
   .filter((x:any)=>x.api_providers?.is_active)
   .map((x:any)=>({
     packageId:x.id,
     providerId:x.provider_id,
     providerName:x.api_providers?.name,
     providerCode:x.provider_product_code,
     cost:Number(x.cost||999999),
     priority:Number(x.api_providers?.priority||999),
     availability:x.api_providers?.config?.availability!=='down'
   }))
   .filter((x:any)=>x.availability)
   .sort((a:any,b:any)=>a.cost-b.cost || a.priority-b.priority);

  if(!candidates.length)
   return NextResponse.json({error:'No available provider'},{status:404});

  return NextResponse.json({selected:candidates[0],candidates});
 }catch(e:any){
  return NextResponse.json({error:e.message},{status:500});
 }
}
