import {Component, OnInit} from '@angular/core';
import {CategoriesService, Category} from "@ang-apps-monorepo/products";

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit{
  categories: Category[] = [];
  constructor(private categoriesServices: CategoriesService) {
  }
  ngOnInit(): void {
    this.categoriesServices.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }
}
