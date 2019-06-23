import { Component, OnInit } from '@angular/core';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'user-list',
  templateUrl: 'user.list.component.html',
  styleUrls: []
})
export class UserListComponent implements OnInit {
  columns: string[] = ['Id', 'Username', 'Name', 'Email'];
  sortColumns: string[] = ['Id', 'Username', 'Name', 'Email'];
  service: string = 'UserService';

  constructor() {}

  ngOnInit() { }
}
