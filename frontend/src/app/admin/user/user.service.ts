import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, UserApi } from './user';
import { SubjectService } from 'src/app/common/subjects/subject.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService implements SubjectService {
  url: string = '/api/user';

  constructor(private http: HttpClient, private router: Router) { }

  createUser(user: User): Observable<{}> {
    return this.http.post(this.url, user);
  }

  editUser(user: User, id: number): Observable<{}> {
    return this.http.put(`${this.url}/${id}`, user);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  list(sortBy: string, sortType: string, pageIndex: number,
    pageSize: number, filter: string): Observable<UserApi> {
    return this.http.get<UserApi>(this.url, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('sortType', sortType)
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString())
    });
  }

  edit(id): void {
    this.router.navigate(['/user/manage', id])
  }
  
  delete(id, username): Observable<{}>  {
    return this.http.delete(`${this.url}/${id}/${username}`);
  }
}