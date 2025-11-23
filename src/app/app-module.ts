// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { App } from './app';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { Cart } from './components/cart/cart';
import { Confirmation } from './components/confirmation/confirmation';
import { ProductService } from './services/product';
import { CartService } from './services/cart';
import { provideHttpClient } from '@angular/common/http';


const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'products/:id', component: ProductDetail },
  { path: 'cart', component: Cart },
  { path: 'confirmation', component: Confirmation },
];

@NgModule({
  declarations: [App, ProductList, ProductDetail, Cart, Confirmation],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes), Cart, Confirmation, ProductList, ProductDetail],
  providers: [ProductService, CartService, provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
