import { Order, OrdersService } from '@ang-apps-monorepo/orders';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../order.constants';
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endsubs$: Subject<any> = new Subject();
  constructor(private ordersService: OrdersService, private router: Router) {}
  ngOnInit(): void {
    this._getOrders();
  }
  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getOrders() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }
  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  // NOT Implemented Yet !!!!!!!!!
  deleteOrder(orderId: string) {}
}
