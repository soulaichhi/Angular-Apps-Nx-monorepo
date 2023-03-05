import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import {
  CategoriesService,
  Product,
  ProductsService,
} from '@ang-apps-monorepo/products';
@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentProductId: string;
  categories = [];
  displayImage: string | ArrayBuffer;
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private messageService: MessageService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [false],
    });
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      console.log(key);
      console.log(this.productForm[key].value);
      productFormData.append(key, this.productForm[key].value);
    });
    this._addProduct(productFormData);
  }
  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.displayImage = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Category',
          detail: `The Product ${product.name} is Created`,
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
  get productForm() {
    return this.form.controls;
  }
}
