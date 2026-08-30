export type ProductType = 'physical' | 'digital';

export type CartItem = {
  productId: string;
  variantId?: string | null;
  name: string;
  price: number;
  quantity: number;
  productType: ProductType;
  playerData?: Record<string, unknown>;
};

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'confirmed'
  | 'preparing'
  | 'processing'
  | 'out_for_delivery'
  | 'completed'
  | 'delivered'
  | 'failed'
  | 'cancelled'
  | 'refunded';
