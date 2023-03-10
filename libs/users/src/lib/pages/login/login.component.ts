import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
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
    if (this.loginFormGroup.invalid) return;
    const loginData = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value,
    };
    this.auth.login(loginData.email, loginData.password).subscribe(
      (user) => {
        this.authError = false;
        this.localStorageService.setToken(user.token);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the server, try again later !';
        }
      }
    );
  }
  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
