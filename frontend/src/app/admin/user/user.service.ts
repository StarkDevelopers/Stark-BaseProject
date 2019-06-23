import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, UserApi } from './user';
import { SubjectService } from 'src/app/common/subjects/subject.service';

@Injectable()
export class UserService implements SubjectService {
  url: string = '/api/user';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<{}> {
    return this.http.post<User>(this.url, user);
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
}