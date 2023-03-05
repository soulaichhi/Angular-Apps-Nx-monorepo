import { Product, ProductsService } from '@ang-apps-monorepo/products';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`/products/form/${productId}`);
  }
}
