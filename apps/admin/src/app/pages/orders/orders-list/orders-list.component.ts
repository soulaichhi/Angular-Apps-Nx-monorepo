import { Order, OrdersService } from '@ang-apps-monorepo/orders';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ORDER_STATUS } from '../order.constants';
@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  constructor(private ordersService: OrdersService, private router: Router) {}
  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }
  deleteOrder(orderId: string) {}
}
