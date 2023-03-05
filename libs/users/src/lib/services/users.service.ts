import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiURLUsers = environment.apiURL + 'users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  getUser(UserId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${UserId}`);
  }

  createUser(User: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, User);
  }

  deleteUser(UserId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiURLUsers}/${UserId}`);
  }

  updateUser(User: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${User.id}`, User);
  }
}
