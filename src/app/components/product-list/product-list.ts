import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

/**
 * @description Component responsible for displaying the product catalog.
 * Shows all available products with options to add them to the shopping cart.
 * Demonstrates parent component managing child components with @Input/@Output.
 * @class ProductList
 * @implements {OnInit}
 */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false,
})
export class ProductList implements OnInit {
  /** @description Array containing all products to display */
  products: Product[] = [];

  /** @description Object mapping product IDs to their selected quantities */
  selectedQuantities: { [key: number]: number } = {};

  /**
   * @description Creates an instance of ProductList component.
   * @constructor
   * @param {ProductService} productService - Service for product data operations
   * @param {CartService} cartService - Service for cart management operations
   * @param {Router} router - Angular router for navigation
   */
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  /**
   * @description Angular lifecycle hook that initializes the component.
   * Loads products from the service and sets up default quantities.
   */
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        // Initialize quantities to 1 for each product immediately
        this.selectedQuantities = {};
        products.forEach((p) => (this.selectedQuantities[p.id] = 1));
      },
      error: (error) => {
        console.error('Error loading products:', error);
      },
    });
  }

  /**
   * @description TrackBy function for Angular *ngFor optimization.
   * @param {number} index - The index of the current item
   * @param {Product} product - The product object
   * @returns {number} The unique identifier for tracking
   */
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  /**
   * @description Handles quantity changes from child components.
   * Demonstrates parent receiving data from child via @Output EventEmitter.
   * @param {Object} event - Event data from child component
   * @param {number} event.productId - ID of the product
   * @param {number} event.quantity - New quantity value
   */
  onQuantityChange(event: { productId: number; quantity: number }): void {
    this.selectedQuantities[event.productId] = event.quantity;
  }

  /**
   * @description Handles add to cart events from child components.
   * Demonstrates parent receiving events from child via @Output EventEmitter.
   * @param {Object} event - Event data from child component
   * @param {Product} event.product - The product to add
   * @param {number} event.quantity - Quantity to add
   */
  onAddToCart(event: { product: Product; quantity: number }): void {
    console.log(`ProductList received: Product ${event.product.id}, Quantity: ${event.quantity}`);
    if (event.quantity <= 0) {
      alert('Please select a quantity greater than 0');
      return;
    }
    this.cartService.addToCart(event.product, event.quantity);
    alert(`Added ${event.quantity} ${event.product.name} to cart!`);
  }

  /**
   * @description Handles product selection events from child components for navigation.
   * Demonstrates parent receiving events from child via @Output EventEmitter.
   * @param {number} productId - ID of the selected product
   */
  onProductSelect(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  /**
   * @description Legacy method for backwards compatibility.
   * @param {Product} product - The product to add to the cart
   * @deprecated Use onAddToCart instead for proper parent-child communication
   */
  addToCart(product: Product): void {
    const quantity = this.selectedQuantities[product.id] || 1;
    this.onAddToCart({ product, quantity });
  }
}
