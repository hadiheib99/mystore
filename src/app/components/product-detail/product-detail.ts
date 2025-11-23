// src/app/components/product-detail/product-detail.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
  standalone: false,
})
export class ProductDetail {
  product: Product | undefined;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe((p) => (this.product = p));
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product, this.quantity);
  }
}
