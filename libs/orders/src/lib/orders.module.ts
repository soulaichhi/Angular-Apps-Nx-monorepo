import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ordersRoutes } from './lib.routes';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ordersRoutes),
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
  ],
  declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent],
  exports: [CartIconComponent, CartPageComponent, OrderSummaryComponent],
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
