import type {MetadataRoute} from 'next';
import {supabaseAdmin} from '../lib/server/supabase-admin';

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
 const staticRoutes=['','/shop','/topup','/search','/track-order'].map(path=>({
  url:`${base}${path}`,lastModified:new Date(),changeFrequency:'daily' as const,priority:path===''?1:0.8
 }));
 const {data}=await supabaseAdmin().from('products').select('slug,created_at').eq('is_active',true);
 const products=(data||[]).map((p:any)=>({
  url:`${base}/product/${p.slug}`,
  lastModified:new Date(p.created_at||Date.now()),
  changeFrequency:'weekly' as const,
  priority:0.9
 }));
 return [...staticRoutes,...products];
}
