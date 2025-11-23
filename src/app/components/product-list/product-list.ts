import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false,
})
export class ProductList implements OnInit {
  products: Product[] = [];
  selectedQuantities: { [key: number]: number } = {};

  constructor(private productService: ProductService, private cartService: CartService) {}

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

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  addToCart(product: Product): void {
    const quantity = this.selectedQuantities[product.id] || 1;
    if (quantity <= 0) {
      alert('Please select a quantity greater than 0');
      return;
    }
    this.cartService.addToCart(product, quantity);
    alert(`Added ${quantity} ${product.name} to cart!`);
  }
}
