import { Component, OnInit } from '@angular/core';
import { UsersService, User } from '@ang-apps-monorepo/users';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private usersServices: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._getAllUsers();
  }
  deleteCategory(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersServices.deleteUser(userId).subscribe(
          () => {
            this._getAllUsers();
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

  updateUser(userId: string) {
    this.router.navigateByUrl(`/users/form/${userId}`);
  }

  private _getAllUsers() {
    this.usersServices.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
