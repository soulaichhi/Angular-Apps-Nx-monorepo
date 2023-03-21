import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent {
  constructor(private router: Router) {}
  backToShop() {
    this.router.navigate(['/products']);
  }
  deleteCartItem() {}
}
