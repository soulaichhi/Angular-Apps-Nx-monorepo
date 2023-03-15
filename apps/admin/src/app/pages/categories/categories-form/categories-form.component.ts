import { CategoriesService, Category } from '@ang-apps-monorepo/products';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string;
  endsubs$: Subject<any> = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#c926c9'],
    });

    this._checkEditMode();
  }
  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }
  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    // console.log(this.categoryForm.name.value);

    // console.log(this.categoryForm.icon.value);
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value,
    };
    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  private _updateCategory(category: Category) {
    this.categoriesService
      .updateCategory(category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (category: Category) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Category',
            detail: `The Category ${category.name} is Updated`,
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
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
  }
  private _addCategory(category: Category) {
    this.categoriesService
      .createCategory(category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Category',
            detail: `The Category ${response.name} is Added`,
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
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
  }
  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService
          .getCategory(params.id)
          .pipe(takeUntil(this.endsubs$))
          .subscribe((category) => {
            this.categoryForm.name.setValue(category.name);
            this.categoryForm.icon.setValue(category.icon);
            this.categoryForm.color.setValue(category.color);
          });
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }
}
