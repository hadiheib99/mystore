import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

/**
 * @description Service responsible for managing shopping cart operations.
 * Handles adding items, updating quantities, calculating totals, and order processing.
 * @class CartService
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  /** @description Array storing all items currently in the shopping cart */
  private items: CartItem[] = [];

  /** @description Total amount of the last completed order */
  private lastOrderTotal = 0;

  /** @description Name of the customer from the last completed order */
  private lastCustomerName = '';

  /**
   * @description Retrieves all items currently in the shopping cart.
   * @returns {CartItem[]} Array of cart items
   */
  getItems(): CartItem[] {
    return this.items;
  }

  /**
   * @description Adds a product to the shopping cart with specified quantity.
   * If the product already exists in the cart, increases the quantity.
   * @param {Product} product - The product to add to the cart
   * @param {number} [quantity=1] - The quantity of the product to add
   */
  addToCart(product: Product, quantity: number = 1): void {
    const existing = this.items.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  /**
   * @description Updates the quantity of a specific product in the cart.
   * If quantity is 0 or negative, removes the item from the cart.
   * @param {number} productId - The ID of the product to update
   * @param {number} quantity - The new quantity for the product
   */
  updateQuantity(productId: number, quantity: number): void {
    const item = this.items.find((i) => i.product.id === productId);
    if (!item) return;

    item.quantity = quantity;
    if (item.quantity <= 0) {
      this.items = this.items.filter((i) => i.product.id !== productId);
    }
  }

  /**
   * @description Removes all items from the shopping cart.
   */
  clearCart(): void {
    this.items = [];
  }

  /**
   * @description Calculates the total price of all items in the cart.
   * @returns {number} The total price of all cart items
   */
  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  /**
   * @description Stores order information for confirmation display.
   * @param {string} name - The customer's name
   */
  setOrderInfo(name: string): void {
    this.lastCustomerName = name;
    this.lastOrderTotal = this.getTotal();
  }

  /**
   * @description Retrieves the stored order information.
   * @returns {Object} Object containing customer name and order total
   * @returns {string} returns.name - The customer's name
   * @returns {number} returns.total - The order total amount
   */
  getOrderInfo() {
    return {
      name: this.lastCustomerName,
      total: this.lastOrderTotal,
    };
  }
}
