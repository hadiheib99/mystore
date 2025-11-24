import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../models/product';

/**
 * @description Child component for displaying individual product items.
 * Receives product data from parent and emits events back to parent.
 * Demonstrates proper @Input and @Output decorator usage for parent-child communication.
 * @class ProductItem
 * @implements {OnInit}
 */
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
  standalone: false,
})
export class ProductItem implements OnInit {
  /**
   * @description Product data received from parent component
   * @Input decorator enables parent-to-child data flow
   */
  @Input() product!: Product;

  /**
   * @description Selected quantity received from parent component
   * @Input decorator enables parent-to-child data flow
   */
  @Input() selectedQuantity: number = 1;

  /**
   * @description Event emitter for quantity changes
   * @Output decorator enables child-to-parent communication
   */
  @Output() quantityChange = new EventEmitter<{ productId: number; quantity: number }>();

  /**
   * @description Event emitter for add to cart actions
   * @Output decorator enables child-to-parent communication
   */
  @Output() addToCart = new EventEmitter<{ product: Product; quantity: number }>();

  /**
   * @description Event emitter for product selection (navigation to detail)
   * @Output decorator enables child-to-parent communication
   */
  @Output() productSelect = new EventEmitter<number>();

  ngOnInit(): void {
    // Ensure selectedQuantity has a valid value
    if (!this.selectedQuantity || this.selectedQuantity <= 0) {
      this.selectedQuantity = 1;
    }
  }

  /**
   * @description Handles quantity changes and emits to parent
   * @param {Event} event - The change event from select element
   */
  onQuantityChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const quantity = Number(target.value);
    this.selectedQuantity = quantity; // Update local property
    this.quantityChange.emit({ productId: this.product.id, quantity });
  }

  /**
   * @description Handles add to cart button clicks and emits to parent
   * @param {Event} event - The click event to stop propagation
   */
  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit({ product: this.product, quantity: this.selectedQuantity });
  }

  /**
   * @description Handles product card clicks and emits to parent for navigation
   */
  onProductSelect(): void {
    this.productSelect.emit(this.product.id);
  }
}
