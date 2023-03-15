import { Order, OrdersService } from '@ang-apps-monorepo/orders';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../order.constants';
@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [],
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;
  endsubs$: Subject<any> = new Subject();
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }
  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }
  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }
  private _getOrder() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id) {
        this.orderService
          .getOrder(params.id)
          .pipe(takeUntil(this.endsubs$))
          .subscribe((order) => {
            this.order = order;
            this.selectedStatus = order.status;
          });
      }
    });
  }
  onStatusChange(event) {
    this.orderService
      .updateOrder({ status: event.value }, this.order.id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Category',
            detail: `The Status is Updated`,
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `there is an error ${error}`,
          });
        }
      );
  }
}
