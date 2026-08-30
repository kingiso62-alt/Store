import {NextResponse} from 'next/server';
import {requireAdmin} from '../../../../../lib/server/require-admin';
import {supabaseAdmin} from '../../../../../lib/server/supabase-admin';

export async function POST(req:Request){
 const g=await requireAdmin(req); if(g.error)return g.error;
 try{
  const form=await req.formData();
  const file=form.get('file');
  const productId=String(form.get('productId')||'');
  if(!(file instanceof File)||!productId)
    return NextResponse.json({error:'File and productId are required'},{status:400});

  const ext=file.name.split('.').pop()?.toLowerCase()||'bin';
  const safe=['png','jpg','jpeg','webp','gif'].includes(ext);
  if(!safe)return NextResponse.json({error:'Unsupported image type'},{status:400});
  if(file.size>8*1024*1024)return NextResponse.json({error:'Image exceeds 8MB'},{status:400});

  const bytes=await file.arrayBuffer();
  const path=`${productId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const db=supabaseAdmin();
  const {error:upErr}=await db.storage.from('product-images').upload(path,bytes,{
    contentType:file.type||`image/${ext}`,upsert:false
  });
  if(upErr)throw upErr;
  const {data:pub}=db.storage.from('product-images').getPublicUrl(path);
  const url=pub.publicUrl;

  const isPrimary=String(form.get('isPrimary')||'false')==='true';
  if(isPrimary)await db.from('product_images').update({is_primary:false}).eq('product_id',productId);
  const {data:image,error:imgErr}=await db.from('product_images').insert({
    product_id:productId,url,alt_text:String(form.get('altText')||''),sort_order:Number(form.get('sortOrder')||0),is_primary:isPrimary
  }).select().single();
  if(imgErr)throw imgErr;

  return NextResponse.json({image,path,url});
 }catch(e:any){return NextResponse.json({error:e.message||'Upload failed'},{status:500});}
}
