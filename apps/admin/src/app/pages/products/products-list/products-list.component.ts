import { Product, ProductsService } from '@ang-apps-monorepo/products';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._getProducts();
  }
  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  private _getProducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((products) => {
        this.products = products;
      });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`/products/form/${productId}`);
  }

  // DELETE Product not implemented yet !!!!!!!!!
}
