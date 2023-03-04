import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
      rating: ['', Validators.required],
      numReviews: [0, Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [''],
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  onCancel() {
    this.location.back();
  }

  onSubmit() {}
  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.displayImage = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }
}
