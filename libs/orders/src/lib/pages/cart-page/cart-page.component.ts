import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItemDetailed, OrdersService } from '@ang-apps-monorepo/orders';
@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit {
  cartItemsDetailed: CartItemDetailed[] = [];
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}
  ngOnInit(): void {
    this._getCartDetails();
  }
  backToShop() {
    this.router.navigate(['/products']);
  }
  deleteCartItem() {}
  private _getCartDetails() {
    this.cartService.cart$.pipe().subscribe((resCart) => {
      resCart.items.forEach((cartItem) => {
        this.ordersService
          .getProduct(cartItem.productId)
          .subscribe((resProduct) => {
            this.cartItemsDetailed.push({
              product: resProduct,
              quantity: cartItem.quantity,
            });
          });
      });
    });
  }
}
