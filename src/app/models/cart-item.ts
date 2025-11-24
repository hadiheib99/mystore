import { Product } from './product';

/**
 * @description Interface representing an item in the shopping cart.
 * Combines product information with quantity for cart management.
 * @interface CartItem
 */
export interface CartItem {
  /** @description The product object containing all product details */
  product: Product;

  /** @description The quantity of this product in the cart */
  quantity: number;
}
