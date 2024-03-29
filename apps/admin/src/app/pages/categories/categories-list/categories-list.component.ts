import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@ang-apps-monorepo/products';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endsubs$: Subject<any> = new Subject();
  constructor(
    private categoriesServices: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._getAllCategories();
  }
  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesServices.deleteCategory(categoryId).subscribe(
          () => {
            this._getAllCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Category',
              detail: `The Category is Deleted`,
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Error ${error.status}`,
            });
          }
        );
      },
      reject: () => {},
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`/categories/form/${categoryId}`);
  }

  private _getAllCategories() {
    this.categoriesServices
      .getCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }
}
