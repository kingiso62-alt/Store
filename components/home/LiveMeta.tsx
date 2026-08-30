import { supabaseAdmin } from '../../lib/server/supabase-admin';

const defaultCats = [
  { id: '1', name: 'Mouse', slug: 'mouse', icon: '/images/categories/mouse.png' },
  { id: '2', name: 'Keyboards', slug: 'keyboards', icon: '/images/categories/keyboard.png' },
  { id: '3', name: 'Headsets', slug: 'headsets', icon: '/images/categories/headset.png' },
  { id: '4', name: 'Controllers', slug: 'controllers', icon: '/images/categories/controller.png' },
  { id: '5', name: 'Chairs', slug: 'chairs', icon: '/images/categories/chair.png' },
  { id: '6', name: 'Desk Mats', slug: 'mouse-pads', icon: '/images/categories/mousepad.png' },
  { id: '7', name: 'Microphones', slug: 'microphones', icon: '/images/categories/microphone.png' },
  { id: '8', name: 'Monitors', slug: 'monitors', icon: '/images/categories/monitor.png' },
];

const defaultBrands = [
  { id: '1', name: 'Logitech G', slug: 'logitech', logo: '/images/brands/logitech.svg' },
  { id: '2', name: 'Razer', slug: 'razer', logo: '/images/brands/razer.svg' },
  { id: '3', name: 'SteelSeries', slug: 'steelseries', logo: '/images/brands/steelseries.svg' },
  { id: '4', name: 'HyperX', slug: 'hyperx', logo: '/images/brands/hyperx.svg' },
  { id: '5', name: 'Redragon', slug: 'redragon', logo: '/images/brands/redragon.svg' },
  { id: '6', name: 'PlayStation', slug: 'playstation', logo: '/images/brands/playstation.svg' },
  { id: '7', name: 'Corsair', slug: 'corsair', logo: '/images/brands/corsair.svg' },
  { id: '8', name: 'ASUS ROG', slug: 'asus-rog', logo: '/images/brands/asus-rog.svg' },
];

export async function LiveCategories() {
  let items = defaultCats;
  try {
    const { data } = await supabaseAdmin().from('categories').select('*').eq('type', 'physical').order('name').limit(8);
    if (data && data.length) {
      items = data.map((c: any) => ({
        ...c,
        icon: defaultCats.find(dc => dc.slug === c.slug)?.icon || '/images/categories/mouse.png'
      }));
    }
  } catch {}

  return (
    <div className="categoryGrid">
      {items.map((x: any) => (
        <a href={`/shop?category=${x.slug}`} className="catCard" key={x.id}>
          <div className="catImgBox">
            <img 
              src={x.icon || defaultCats.find(d => d.slug === x.slug)?.icon || '/images/categories/mouse.png'} 
              alt={x.name} 
              className="catProductImg"
            />
          </div>
          <b className="catNameText">{x.name}</b>
        </a>
      ))}
    </div>
  );
}

export async function LiveBrands() {
  let items = defaultBrands;
  try {
    const { data } = await supabaseAdmin().from('brands').select('*').order('name').limit(8);
    if (data && data.length) {
      items = data.map((b: any) => {
        const match = defaultBrands.find(
          db => db.name.toLowerCase().includes(b.name.toLowerCase()) || 
                b.name.toLowerCase().includes(db.slug)
        );
        return {
          ...b,
          logo: match?.logo || '/images/brands/logitech.svg'
        };
      });
    }
  } catch {}

  return (
    <div className="brandsGrid modernBrandsGrid">
      {items.map((x: any) => (
        <a 
          href={`/shop?brand=${x.slug || x.name.toLowerCase()}`} 
          key={x.id} 
          className="modernBrandCard"
          title={`Shop official ${x.name} gear`}
        >
          <img 
            src={x.logo || defaultBrands.find(db => db.name.toLowerCase().includes(x.name.toLowerCase()))?.logo || '/images/brands/logitech.svg'} 
            alt={x.name} 
            className="modernBrandSvg"
          />
        </a>
      ))}
    </div>
  );
}
