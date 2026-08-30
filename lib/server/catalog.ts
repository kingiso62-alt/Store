import { supabaseAdmin } from './supabase-admin';

const fallbackProducts = [
  { id: 'p1', name: 'Logitech G502 Hero', slug: 'logitech-g502-hero', description: 'High Performance Hero 25K Gaming Mouse with tunable weights and RGB.', product_type: 'physical', price: 49.99, compare_at_price: 62.49, is_featured: true, categories: { name: 'Mouse', slug: 'mouse' }, brands: { name: 'Logitech' }, product_images: [{ id: 'img1', url: '/images/products/logitech-g502.png', is_primary: true }], product_variants: [{ id: 'v1', sku: 'LOG-G502', variant_name: 'Standard Black', price: 49.99, stock: 15 }] },
  { id: 'p2', name: 'Redragon K552 RGB', slug: 'redragon-k552', description: 'Compact Tenkeyless Mechanical Gaming Keyboard with tactile switches.', product_type: 'physical', price: 39.99, compare_at_price: 56.49, is_featured: true, categories: { name: 'Keyboards', slug: 'keyboards' }, brands: { name: 'Redragon' }, product_images: [{ id: 'img2', url: '/images/products/redragon-k552.png', is_primary: true }], product_variants: [{ id: 'v2', sku: 'RED-K552', variant_name: 'RGB Red Switch', price: 39.99, stock: 8 }] },
  { id: 'p3', name: 'HyperX Cloud II', slug: 'hyperx-cloud-ii', description: 'Premium Esports Gaming Headset with virtual 7.1 surround sound & noise cancelling mic.', product_type: 'physical', price: 69.99, compare_at_price: 89.99, is_featured: true, categories: { name: 'Headsets', slug: 'headsets' }, brands: { name: 'HyperX' }, product_images: [{ id: 'img3', url: '/images/products/hyperx-cloud2.png', is_primary: true }], product_variants: [{ id: 'v3', sku: 'HYP-CL2', variant_name: 'Gunmetal Red', price: 69.99, stock: 12 }] },
  { id: 'p4', name: 'PS5 DualSense Wireless Controller', slug: 'ps5-dualsense', description: 'Official Next-Gen wireless gaming controller with haptic feedback.', product_type: 'physical', price: 64.99, compare_at_price: 74.99, is_featured: true, categories: { name: 'Controllers', slug: 'controllers' }, brands: { name: 'Sony' }, product_images: [{ id: 'img4', url: '/images/products/ps5-dualsense.png', is_primary: true }], product_variants: [{ id: 'v4', sku: 'SNY-PS5', variant_name: 'Midnight Black', price: 64.99, stock: 20 }] },
  { id: 'p5', name: 'Razer BlackShark V2', slug: 'razer-blackshark-v2', description: 'Multi-platform esports headset with THX Spatial Audio.', product_type: 'physical', price: 89.99, compare_at_price: 120.99, is_featured: true, categories: { name: 'Headsets', slug: 'headsets' }, brands: { name: 'Razer' }, product_images: [{ id: 'img5', url: '/images/products/razer-blackshark.png', is_primary: true }], product_variants: [{ id: 'v5', sku: 'RZR-BSV2', variant_name: 'Special Edition', price: 89.99, stock: 6 }] },
  { id: 'p6', name: 'SteelSeries Rival 3', slug: 'steelseries-rival-3', description: 'Engineered for hyper durable performance and true 1-to-1 tracking.', product_type: 'physical', price: 29.99, compare_at_price: 39.99, is_featured: true, categories: { name: 'Mouse', slug: 'mouse' }, brands: { name: 'SteelSeries' }, product_images: [{ id: 'img6', url: '/images/products/steelseries-rival3.png', is_primary: true }], product_variants: [{ id: 'v6', sku: 'STL-R3', variant_name: 'Matte Black', price: 29.99, stock: 14 }] },
  { id: 'p7', name: 'Tokiyo RGB Gaming Chair', slug: 'tokiyo-rgb-chair', description: 'Ergonomic lumbar support gaming chair with custom RGB edge lighting.', product_type: 'physical', price: 189.99, compare_at_price: 249.99, is_featured: true, categories: { name: 'Chairs', slug: 'chairs' }, brands: { name: 'Tokiyo' }, product_images: [{ id: 'img7', url: '/images/categories/chair.png', is_primary: true }], product_variants: [{ id: 'v7', sku: 'TOK-CHR', variant_name: 'Navy/Crimson', price: 189.99, stock: 5 }] },
  { id: 'p8', name: 'UltraGear 27" 165Hz Curved Monitor', slug: 'ultragear-27-monitor', description: '1ms response time, 2K QHD 1500R curved gaming monitor with HDR10.', product_type: 'physical', price: 229.99, compare_at_price: 279.99, is_featured: true, categories: { name: 'Monitors', slug: 'monitors' }, brands: { name: 'Tokiyo' }, product_images: [{ id: 'img8', url: '/images/categories/monitor.png', is_primary: true }], product_variants: [{ id: 'v8', sku: 'TOK-MON', variant_name: 'Curved 27"', price: 229.99, stock: 7 }] }
];

// In-memory instant cache to prevent slow database stalls
let cachedProducts: Record<string, { data: any[]; timestamp: number }> = {};
const CACHE_TTL_MS = 60000; // 1 minute

async function withTimeout<T>(promise: Promise<T>, ms: number = 200): Promise<T> {
  let timeoutHandle: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error('DB Timeout')), ms);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutHandle);
  }
}

export async function getProducts(type?: 'physical' | 'digital') {
  const cacheKey = type || 'all';
  const cached = cachedProducts[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const fetchPromise = (async () => {
      let q = supabaseAdmin().from('products')
        .select('id,name,slug,description,product_type,price,compare_at_price,is_featured,product_images(url,is_primary,sort_order),product_variants(id,sku,variant_name,price,stock,attributes),categories(name,slug),brands(name)')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (type) q = q.eq('product_type', type);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    })();

    const data = await withTimeout(fetchPromise, 180);
    if (data && data.length > 0) {
      cachedProducts[cacheKey] = { data, timestamp: Date.now() };
      return data;
    }
  } catch (e) {}

  const result = type ? fallbackProducts.filter(p => p.product_type === type) : fallbackProducts;
  cachedProducts[cacheKey] = { data: result, timestamp: Date.now() };
  return result;
}

export async function getProductBySlug(slug: string) {
  try {
    const fetchPromise = (async () => {
      const { data, error } = await supabaseAdmin().from('products')
        .select('*,product_images(*),product_variants(*),categories(name,slug),brands(name)')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
      if (error) throw error;
      return data;
    })();

    const data = await withTimeout(fetchPromise, 180);
    if (data) return data;
  } catch (e) {}

  const found = fallbackProducts.find(p => p.slug === slug);
  return found || fallbackProducts[0];
}
