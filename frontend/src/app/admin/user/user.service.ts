import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable()
export class UserService {
  url: string = '/api/user';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<{}> {
    return this.http.post<User>(this.url, user);
  }

  listUser(): Observable<User> {
    return this.http.get<User>(this.url);
  }
}