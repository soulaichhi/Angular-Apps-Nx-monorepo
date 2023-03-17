import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  endsubs$: Subject<any> = new Subject();
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}
  ngOnInit(): void {
    this._getProducts();
    this._getCategories();
  }
  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }
  private _getProducts(categoriesFilter?: string[]) {
    this.productsService
      .getProducts(categoriesFilter)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((products) => {
        this.products = products;
      });
  }
  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }
  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);
    this._getProducts(selectedCategories);
  }
}
