import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CartItem } from '../../../models/cart-item';

/**
 * @description Child component for displaying individual cart items.
 * Receives cart item data from parent and emits quantity update events.
 * Demonstrates proper @Input and @Output decorator usage for parent-child communication.
 * @class CartItemComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  standalone: false,
})
export class CartItemComponent implements OnInit {
  /**
   * @description Cart item data received from parent component
   * @Input decorator enables parent-to-child data flow
   */
  @Input() item!: CartItem;

  /**
   * @description Event emitter for quantity changes
   * @Output decorator enables child-to-parent communication
   */
  @Output() quantityUpdate = new EventEmitter<{ productId: number; quantity: number }>();

  ngOnInit(): void {
    console.log(
      `CartItem ${this.item.product.id}: quantity = ${this.item.quantity}, type = ${typeof this.item
        .quantity}`
    );
    console.log(
      `CartItem ${this.item.product.id}: quantity.toString() = '${this.item.quantity.toString()}'`
    );
  }

  /**
   * @description Handles quantity changes and emits to parent
   * @param {number} quantity - The new quantity value from ngModelChange
   */
  onQuantityChange(quantity: number): void {
    this.quantityUpdate.emit({
      productId: this.item.product.id,
      quantity,
    });
  }
}
