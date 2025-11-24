// ...existing code...
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

/**
 * @description Component responsible for displaying detailed product information.
 * Shows individual product details and allows adding the product to cart.
 * @class ProductDetail
 * @implements {OnInit}
 */
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: false,
})
export class ProductDetail implements OnInit {
  /** @description The product being displayed, undefined if not found or loading */
  product: Product | undefined;

  /** @description The quantity selected by the user for adding to cart */
  selectedQuantity = 1;

  /**
   * @description Creates an instance of ProductDetail component.
   * @constructor
   * @param {ActivatedRoute} route - Angular activated route for accessing URL parameters
   * @param {Router} router - Angular router for navigation
   * @param {ProductService} productService - Service for product data operations
   * @param {CartService} cartService - Service for cart management operations
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  /**
   * @description Angular lifecycle hook that initializes the component.
   * Loads the specific product based on the ID from the route parameters.
   */
  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.productService.getProduct(productId).subscribe(
        (product) => {
          this.product = product;
          if (!product) {
            this.router.navigate(['/products']);
          }
        },
        (error) => {
          console.error('Error loading product:', error);
          this.router.navigate(['/products']);
        }
      );
    }
  }

  /**
   * @description Adds the current product to the shopping cart.
   * Validates quantity and product existence before adding.
   */
  addToCart(): void {
    if (this.product && this.selectedQuantity > 0) {
      this.cartService.addToCart(this.product, this.selectedQuantity);
      alert(`Added ${this.selectedQuantity} x ${this.product.name} to cart!`);
    }
  }

  /**
   * @description Navigates back to the products listing page.
   */
  goBack(): void {
    this.router.navigate(['/products']);
  }
}
// ...existing code...
