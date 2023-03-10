import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this._initFormGroup();
  }
  private _initFormGroup() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.isSubmitted = true;
  }
  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
