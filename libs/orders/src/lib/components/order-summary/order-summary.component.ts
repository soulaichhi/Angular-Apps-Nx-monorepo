import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService, OrdersService } from '@ang-apps-monorepo/orders';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  totalPrice: number;
  endsubs$: Subject<any> = new Subject();
  constructor(private cartService: CartService, private ordersService: OrdersService) {}
  ngOnInit() {
    this._getOrderSummary();
  }
  ngOnDestroy() {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endsubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.ordersService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }
}
