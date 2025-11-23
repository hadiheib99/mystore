import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];
  private lastOrderTotal = 0;
  private lastCustomerName = '';

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existing = this.items.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.items.find((i) => i.product.id === productId);
    if (!item) return;
    item.quantity = quantity;
    if (item.quantity <= 0) {
      this.items = this.items.filter((i) => i.product.id !== productId);
    }
  }

  clearCart(): void {
    this.items = [];
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  // Store confirmation data
  setOrderInfo(name: string): void {
    this.lastCustomerName = name;
    this.lastOrderTotal = this.getTotal();
  }

  getOrderInfo() {
    return {
      name: this.lastCustomerName,
      total: this.lastOrderTotal,
    };
  }
}
