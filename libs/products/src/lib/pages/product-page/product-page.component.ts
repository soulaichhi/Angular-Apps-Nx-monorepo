import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { takeUntil, Subject } from 'rxjs';
import { Product } from '../../models/product';
@Component({
  selector: 'ang-apps-monorepo-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product!: Product;
  quantity!: number;
  endsubs$: Subject<any> = new Subject();
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this._getProduct(params.productid);
      }
    });
  }
  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }
  addProductToCart() {}

  private _getProduct(id: string) {
    this.productsService
      .getProduct(id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((product) => {
        this.product = product;
      });
  }
}
