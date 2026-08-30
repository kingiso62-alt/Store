import ProductEngagement from '../../../components/product/ProductEngagement';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import {getProductBySlug} from '../../../lib/server/catalog';
import ProductPurchaseClient from '../../../components/store/ProductPurchaseClient';
import ProductJsonLd from '../../../components/seo/ProductJsonLd';
import type {Metadata} from 'next';

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 try{
  const p:any=await getProductBySlug(slug);
  const image=p.product_images?.find((x:any)=>x.is_primary)?.url||p.product_images?.[0]?.url;
  return {
   title:`${p.name} | TOKIYO STORE`,
   description:p.description||`Buy ${p.name} from TOKIYO STORE.`,
   alternates:{canonical:`/product/${slug}`},
   openGraph:{
    title:p.name,
    description:p.description||`Buy ${p.name} from TOKIYO STORE.`,
    images:image?[image]:undefined,
    type:'website'
   }
  };
 }catch{
  return {title:'Product | TOKIYO STORE'};
 }
}


export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const p:any=await getProductBySlug(slug);
 const images=(p.product_images||[]).sort((a:any,b:any)=>(a.sort_order||0)-(b.sort_order||0));
 return <><ProductJsonLd product={p}/><Header/><main className="wrap productPage">
  <div className="breadcrumbs">Home / Shop / <b>{p.name}</b></div>
  <section className="productDetail">
   <div className="gallery liveGallery">
    <div className="thumbs">{images.slice(0,5).map((x:any)=><div key={x.id}>{x.url?<img src={x.url} alt={x.alt_text||p.name}/>:null}</div>)}</div>
    <div className="mainProduct liveProduct">{images[0]?.url?<img src={images[0].url} alt={p.name}/>:<span className="noImage">TOKIYO</span>}</div>
   </div>
   <div className="productInfo">
    <h1>{p.name}</h1><h4>{p.categories?.name||'Gaming Gear'} {p.brands?.name?`• ${p.brands.name}`:''}</h4>
    <div className="stars">★★★★★ <span>Verified product</span></div>
    <div className="bigPrice">${Number(p.price).toFixed(2)} {p.compare_at_price&&<del>${Number(p.compare_at_price).toFixed(2)}</del>}</div>
    <p>{p.description||'Premium gaming accessory from TOKIYO STORE.'}</p>
    <ProductPurchaseClient product={p}/>
   </div>
  </section>
 <ProductEngagement productId={p.id}/></main><Footer/></>
}
