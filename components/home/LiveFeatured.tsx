import { getProducts } from '../../lib/server/catalog';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

const fallbackProducts = [
  {
    id: 'prod-1',
    name: 'Logitech G502 Hero Mouse',
    category: 'Mouse',
    price: 49.99,
    compare_at_price: 62.49,
    img: '/images/products/logitech-g502.png',
    slug: 'logitech-g502-hero',
    badge: '-20%'
  },
  {
    id: 'prod-2',
    name: 'Redragon K552 RGB Mechanical',
    category: 'Keyboards',
    price: 39.99,
    compare_at_price: 56.49,
    img: '/images/products/redragon-k552.png',
    slug: 'redragon-k552-rgb',
    badge: 'HOT'
  },
  {
    id: 'prod-3',
    name: 'HyperX Cloud II Pro Headset',
    category: 'Headsets',
    price: 69.99,
    compare_at_price: 89.99,
    img: '/images/products/hyperx-cloud2.png',
    slug: 'hyperx-cloud-ii',
    badge: '-22%'
  },
  {
    id: 'prod-4',
    name: 'PS5 DualSense Wireless Controller',
    category: 'Controllers',
    price: 64.99,
    compare_at_price: 74.99,
    img: '/images/products/ps5-dualsense.png',
    slug: 'ps5-dualsense-wireless-controller',
    badge: 'POPULAR'
  },
  {
    id: 'prod-5',
    name: 'Razer BlackShark V2 Pro',
    category: 'Headsets',
    price: 89.99,
    compare_at_price: 120.99,
    img: '/images/products/razer-blackshark.png',
    slug: 'razer-blackshark-v2',
    badge: '-31%'
  },
  {
    id: 'prod-6',
    name: 'SteelSeries Rival 3 RGB',
    category: 'Mouse',
    price: 29.99,
    compare_at_price: 39.99,
    img: '/images/products/steelseries-rival3.png',
    slug: 'steelseries-rival-3',
    badge: 'BEST SELLER'
  }
];

function getRealProductImage(name: string, slug: string, idx: number = 0): string {
  const s = `${slug || ''} ${name || ''}`.toLowerCase();
  if (s.includes('502') || (s.includes('logitech') && s.includes('hero'))) return '/images/products/logitech-g502.png';
  if (s.includes('k552') || s.includes('redragon') || s.includes('keyboard')) return '/images/products/redragon-k552.png';
  if (s.includes('hyperx') || s.includes('cloud')) return '/images/products/hyperx-cloud2.png';
  if (s.includes('dualsense') || s.includes('ps5') || s.includes('controller')) return '/images/products/ps5-dualsense.png';
  if (s.includes('blackshark') || s.includes('razer')) return '/images/products/razer-blackshark.png';
  if (s.includes('rival') || s.includes('steelseries')) return '/images/products/steelseries-rival3.png';
  
  return fallbackProducts[idx % fallbackProducts.length].img;
}

export default async function LiveFeatured() {
  let products: any[] = [];
  try {
    const dbProds = await getProducts('physical');
    const featured = (dbProds || []).filter((p: any) => p.is_featured).slice(0, 6);
    products = featured.length ? featured : (dbProds || []).slice(0, 6);
  } catch {}

  const items = (products && products.length >= 6) ? products : fallbackProducts;

  return (
    <div className="productGrid modernProductGrid">
      {items.map((p: any, idx: number) => {
        const fallback = fallbackProducts[idx % fallbackProducts.length];
        const img = getRealProductImage(p.name, p.slug, idx);
        const catName = p.categories?.name || p.category || fallback.category;
        const price = Number(p.price || fallback.price).toFixed(2);
        const comparePrice = p.compare_at_price ? Number(p.compare_at_price).toFixed(2) : (fallback.compare_at_price ? Number(fallback.compare_at_price).toFixed(2) : null);
        const badge = p.badge || fallback.badge;

        return (
          <Link href={`/product/${p.slug || fallback.slug}`} className="modernProductCard" key={p.id || idx}>
            <div className="modernProductImgBox">
              {badge && <span className="modernProductBadge">{badge}</span>}
              <img src={img} alt={p.name} className="modernProductRealImg" />
            </div>
            
            <div className="modernProductInfo">
              <span className="modernProductCat">{catName}</span>
              <h3 className="modernProductTitle">{p.name}</h3>
              <div className="modernPriceRow">
                <span className="modernCurrentPrice">${price}</span>
                {comparePrice && <span className="modernOldPrice">${comparePrice}</span>}
              </div>
              <div className="modernQuickBuyBtn">
                <ShoppingCart size={13} />
                <span>Buy Now</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
