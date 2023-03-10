import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private localStorageToken: LocalStorageService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();
    if (token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
