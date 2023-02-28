import { Component } from '@angular/core';
import {CategoriesService} from "../../../../../../libs/products/src/lib/services/categories.service";

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent {
  categories = [
    {
      id: 1,
      name: 'category-1',
      icon: 'icon-1'
    },
    {
      id: 2,
      name: 'category-2',
      icon: 'icon-2'
    },
    {
      id: 3,
      name: 'category-3',
      icon: 'icon-3'
    },
    {
      id: 4,
      name: 'category-4',
      icon: 'icon-4'
    },
    {
      id: 5,
      name: 'category-5',
      icon: 'icon-5'
    },
  ];
  constructor(private categoriesServices: CategoriesService) {
  }
}
