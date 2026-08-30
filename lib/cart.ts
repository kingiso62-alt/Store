import type { CartItem } from '../types/store';

const KEY='tokiyo_cart_v1';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('tokiyo-cart-updated'));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const idx = cart.findIndex(x => x.productId===item.productId && x.variantId===item.variantId);
  if (idx >= 0) cart[idx].quantity += item.quantity;
  else cart.push(item);
  saveCart(cart);
}

export function clearCart(){ saveCart([]); }
