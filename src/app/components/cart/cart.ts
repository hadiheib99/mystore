import { Component } from '@angular/core';
import { CartService } from '../../services/cart';
import { CartItem } from '../../models/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false,
})
export class Cart {
  items: CartItem[];
  name = '';
  address = '';
  creditCard = '';

  constructor(private cartService: CartService, private router: Router) {
    this.items = this.cartService.getItems();
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  updateQuantity(id: number, value: number | string): void {
    const quantity = Number(value);
    this.cartService.updateQuantity(id, quantity);
    this.items = this.cartService.getItems();
  }

  onSubmit(): void {
    if (!this.name || !this.address || !this.creditCard) {
      alert('Please fill all fields');
      return;
    }

    this.cartService.setOrderInfo(this.name);
    this.cartService.clearCart();

    // go to confirmation
    this.router.navigate(['/confirmation']);
  }
}
