import { Component } from '@angular/core';
import { CartService } from '../../services/cart';
import { Router } from '@angular/router';

/**
 * @description Component responsible for displaying order confirmation.
 * Shows the customer's order details after successful checkout.
 * @class Confirmation
 */
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  standalone: false,
})
export class Confirmation {
  /** @description Customer's name for the completed order */
  name = '';

  /** @description Total amount of the completed order */
  total = 0;

  /**
   * @description Creates an instance of Confirmation component.
   * Retrieves and displays the order information from the cart service.
   * @constructor
   * @param {CartService} cartService - Service for retrieving order information
   * @param {Router} router - Angular router for navigation
   */
  constructor(private cartService: CartService, private router: Router) {
    const info = this.cartService.getOrderInfo();
    this.name = info.name;
    this.total = info.total;
  }

  /**
   * @description Navigates back to the products page.
   */
  goBack(): void {
    this.router.navigate(['/products']);
  }
}
