import { AuthService } from '@ang-apps-monorepo/users';
import { Component } from '@angular/core';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}
  logoutUser() {
    this.authService.logout();
  }
}
