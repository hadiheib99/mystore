import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-item';
import { Router } from '@angular/router';

/**
 * @description Component responsible for managing the shopping cart.
 * Displays cart items, handles quantity updates, and processes checkout.
 * Demonstrates parent component managing child components with @Input/@Output.
 * @class Cart
 * @implements {OnInit}
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false,
})
export class Cart implements OnInit {
  /** @description Array of items currently in the shopping cart */
  items: CartItem[] = [];

  /** @description Customer's full name for shipping */
  name = '';

  /** @description Customer's shipping address */
  address = '';

  /** @description Customer's credit card information */
  creditCard = '';

  /**
   * @description Creates an instance of Cart component.
   * @constructor
   * @param {CartService} cartService - Service for cart management operations
   * @param {Router} router - Angular router for navigation
   */
  constructor(private cartService: CartService, private router: Router) {}

  /**
   * @description Angular lifecycle hook that initializes the component.
   * Refreshes cart items to ensure latest data is displayed.
   */
  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  /**
   * @description Getter that returns the total price of all items in the cart.
   * @returns {number} The total price of all cart items
   */
  get total(): number {
    return this.cartService.getTotal();
  }

  /**
   * @description Handles quantity updates from child cart item components.
   * Demonstrates parent receiving data from child via @Output EventEmitter.
   * @param {Object} event - Event data from child component
   * @param {number} event.productId - ID of the product to update
   * @param {number} event.quantity - New quantity value
   */
  onQuantityUpdate(event: { productId: number; quantity: number }): void {
    this.cartService.updateQuantity(event.productId, event.quantity);
    this.items = this.cartService.getItems(); // Refresh items array
  }

  /**
   * @description Refreshes the cart items from the service
   */
  refreshCart(): void {
    this.items = this.cartService.getItems();
    console.log('Cart refreshed with items:', this.items);
  }

  /**
   * @description Legacy method for backwards compatibility.
   * Updates the quantity of a specific item in the cart.
   * Automatically removes items when quantity is set to 0.
   * @param {number} id - The product ID to update
   * @param {number | string} value - The new quantity value
   * @deprecated Use onQuantityUpdate instead for proper parent-child communication
   */
  updateQuantity(id: number, value: number | string): void {
    const quantity = Number(value);
    this.onQuantityUpdate({ productId: id, quantity });
  }

  /**
   * @description Processes the order submission with validation.
   * Validates required fields, stores order info, clears cart, and navigates to confirmation.
   */
  onSubmit(): void {
    if (!this.name || !this.address || !this.creditCard) {
      alert('Please fill all fields');
      return;
    }

    this.cartService.setOrderInfo(this.name);
    this.cartService.clearCart();

    // Navigate to confirmation page
    this.router.navigate(['/confirmation']);
  }

  /**
   * @description Navigates back to the products page.
   */
  goBack(): void {
    this.router.navigate(['/products']);
  }
}
