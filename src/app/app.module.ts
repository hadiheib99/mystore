import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';

// Import components
import { ProductList } from './components/product-list/product-list';
import { ProductItem } from './components/product-item/product-item';
import { ProductDetail } from './components/product-detail/product-detail';
import { Cart } from './components/cart/cart';
import { CartItemComponent } from './components/cart/cart-item/cart-item';
import { Confirmation } from './components/confirmation/confirmation';

// Import services
import { ProductService } from './services/product';
import { CartService } from './services/cart';

/**
 * @description Main application module that bootstraps the Angular application.
 * Configures all components, services, and modules required for the application.
 * Includes child components for demonstrating @Input/@Output decorator usage.
 * @class AppModule
 */
@NgModule({
  declarations: [
    App,
    ProductList,
    ProductItem,
    ProductDetail,
    Cart,
    CartItemComponent,
    Confirmation,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ProductService, CartService],
  bootstrap: [App],
})
export class AppModule {}
