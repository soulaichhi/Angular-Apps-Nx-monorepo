import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService, User } from '@ang-apps-monorepo/users';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [],
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  endsubs$: Subject<any> = new Subject();
  constructor(
    private usersServices: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this._getAllUsers();
  }
  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }
  deleteCategory(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersServices
          .deleteUser(userId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(
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
  getCountryName(countryKey: string) {
    if (countryKey) return this.usersServices.getCountry(countryKey);
  }

  private _getAllUsers() {
    this.usersServices
      .getUsers()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((users) => {
        this.users = users;
      });
  }
}
