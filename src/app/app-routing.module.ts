import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components - make sure these match your actual file names
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { Cart } from './components/cart/cart';
import { Confirmation } from './components/confirmation/confirmation';

const routes: Routes = [
  {
    path: '',
    component: ProductList,
    title: 'Product List',
  },
  {
    path: 'product/:id',
    component: ProductDetail,
    title: 'Product Detail',
  },
  {
    path: 'cart',
    component: Cart,
    title: 'Cart',
  },
  {
    path: 'confirmation',
    component: Confirmation,
    title: 'Confirmation',
  },
  {
    path: '**',
    redirectTo: '',
    title: 'Redirect to Product List',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
