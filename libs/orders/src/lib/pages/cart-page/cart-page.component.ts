import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItemDetailed, OrdersService } from '@ang-apps-monorepo/orders';
import {Subject, takeUntil} from "rxjs";
@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endsubs$: Subject<any> = new Subject()
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}
  ngOnInit(): void {

    this._getCartDetails();
  }
  ngOnDestroy() {
    this.endsubs$.next(true);
    this.endsubs$.complete()
  }

  backToShop() {
    this.router.navigate(['/products']);
  }
  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }
  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endsubs$)).subscribe((resCart) => {
      this.cartItemsDetailed = [];
      this.cartCount = resCart?.items?.length ?? 0;
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
