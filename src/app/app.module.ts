import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';

// Import components - using your actual component names
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { Cart } from './components/cart/cart';
import { Confirmation } from './components/confirmation/confirmation';

// Import services
import { ProductService } from './services/product';
import { CartService } from './services/cart';

@NgModule({
  declarations: [App, ProductList, ProductDetail, Cart, Confirmation],
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
