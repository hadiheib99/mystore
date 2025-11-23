import { Component } from '@angular/core';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.component.css',
  standalone: false,
})
export class Confirmation {
  name = '';
  total = 0;

  constructor(private cartService: CartService) {
    const info = this.cartService.getOrderInfo();
    this.name = info.name;
    this.total = info.total;
  }
}
