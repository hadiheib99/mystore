// ...existing code...
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
  standalone: false,
})
export class ProductDetail implements OnInit {
  product: Product | undefined;
  selectedQuantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

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

  addToCart(): void {
    if (this.product && this.selectedQuantity > 0) {
      this.cartService.addToCart(this.product, this.selectedQuantity);
      alert(`Added ${this.selectedQuantity} x ${this.product.name} to cart!`);
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
// ...existing code...
