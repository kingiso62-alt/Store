import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {getProducts} from '../../lib/server/catalog';
import {Mouse,Keyboard,Headphones,Gamepad2} from 'lucide-react';

function Icon({i}:{i:number}){const I=[Mouse,Keyboard,Headphones,Gamepad2][i%4];return <I size={70}/>}

export default async function Shop(){
 const products=await getProducts('physical');
 return <><Header/><main className="wrap shopPage">
  <div className="pageHead public"><div><small>GAMING GEAR</small><h1>Shop Accessories</h1></div><div className="shopFilters"><button>All</button><button>In Stock</button><button>Best Sellers</button></div></div>
  {!products.length?<div className="emptyState"><h2>No products yet</h2><p>Add products from the admin dashboard and they will appear here automatically.</p></div>:
  <div className="productGrid liveGrid">{products.map((p:any,i:number)=>{
   const img=p.product_images?.find((x:any)=>x.is_primary)?.url||p.product_images?.[0]?.url;
   const minStock=(p.product_variants||[]).reduce((s:number,v:any)=>s+Number(v.stock||0),0);
   return <a className="productCard" href={`/product/${p.slug}`} key={p.id}>
    <div className="productImg">{img?<img src={img} alt={p.name}/>:<Icon i={i}/>} {minStock<=5&&<em>LOW STOCK</em>}</div>
    <h3>{p.name}</h3><small>{p.categories?.name||'Gaming Gear'}</small>
    <div className="stars">★★★★★ <span>Live catalog</span></div>
    <div className="price"><b>${Number(p.price).toFixed(2)}</b>{p.compare_at_price&&<del>${Number(p.compare_at_price).toFixed(2)}</del>}</div>
   </a>
  })}</div>}
 </main><Footer/></>
}
