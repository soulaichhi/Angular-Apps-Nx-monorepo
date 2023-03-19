import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ordersRoutes } from './lib.routes';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [CommonModule, RouterModule],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
