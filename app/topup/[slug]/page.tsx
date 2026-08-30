import ProductEngagement from '../../../components/product/ProductEngagement';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import TopupProductClient from '../../../components/topup/TopupProductClient';

export default async function TopupProductPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
  const r=await fetch(`${base}/api/catalog/topup/${slug}`,{cache:'no-store'});
  if(!r.ok)return <><Header/><main className="wrap emptyState"><h2>Top-up product unavailable</h2></main><Footer/></>;
  const data=await r.json();
  return <><Header/><main className="wrap topupOrderPage"><div className="breadcrumbs">Home / Top-Up / {data.product.name}</div><TopupProductClient product={data.product} packages={data.packages} fields={data.fields}/><ProductEngagement productId={data.product.id}/></main><Footer/></>
}
