import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
 if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const db=supabaseAdmin();const {data:packages,error}=await db.from('topup_packages').select('*').eq('is_active',true);
  if(error)throw error;const updated=[];
  for(const p of packages||[]){
    const cost=Number(p.cost||0),price=Number(p.price||0);
    const minMargin=Number(process.env.MIN_TOPUP_MARGIN_PERCENT||8);
    const minPrice=cost/(1-(minMargin/100));
    if(price<minPrice){
      const next=Math.ceil(minPrice*100)/100;
      await db.from('topup_packages').update({price:next}).eq('id',p.id);
      updated.push({id:p.id,oldPrice:price,newPrice:next,cost});
    }
  }
  return NextResponse.json({updated});
 }catch(e:any){return NextResponse.json({error:e.message},{status:500});}
}
