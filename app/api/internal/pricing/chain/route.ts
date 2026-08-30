import {NextResponse} from 'next/server';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
  if(req.headers.get('x-internal-secret')!==process.env.INTERNAL_JOB_SECRET)
    return NextResponse.json({error:'Unauthorized'},{status:401});
  try{
    const db=supabaseAdmin();
    const {data:alerts,error}=await db.from('cost_change_alerts')
      .select('*,topup_packages(id,price,cost,is_active)')
      .eq('acknowledged',false).order('created_at').limit(100);
    if(error)throw error;

    const minMargin=Number(process.env.MIN_TOPUP_MARGIN_PERCENT||8);
    const updates:any[]=[];

    for(const a of alerts||[]){
      const pkg=a.topup_packages;
      if(pkg?.is_active){
        const cost=Number(a.new_cost||pkg.cost||0);
        const currentPrice=Number(pkg.price||0);
        const minPrice=cost/(1-(minMargin/100));
        if(currentPrice<minPrice){
          const next=Math.ceil(minPrice*100)/100;
          await db.from('topup_packages').update({price:next}).eq('id',pkg.id);
          updates.push({packageId:pkg.id,oldPrice:currentPrice,newPrice:next,cost});
        }
      }
      await db.from('cost_change_alerts').update({acknowledged:true}).eq('id',a.id);
    }
    return NextResponse.json({processed:(alerts||[]).length,updates});
  }catch(e:any){
    return NextResponse.json({error:e.message},{status:500});
  }
}
