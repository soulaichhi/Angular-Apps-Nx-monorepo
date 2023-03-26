import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, timer } from 'rxjs';
import { User, UsersService } from '@ang-apps-monorepo/users';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { OrderItem } from '@ang-apps-monorepo/orders';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  userId: string;
  orderItems: OrderItem[] = [];
  countries = [];
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
  }
}
