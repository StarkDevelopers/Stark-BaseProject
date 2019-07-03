import { Component, OnInit } from '@angular/core';
import { DatatableAction } from 'src/app/utils/datatable/datatable-action';

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
  actions: DatatableAction[] = [
    { name: 'edit', method: 'edit', params: ['Id'] },
    { name: 'delete', method: 'delete', params: ['Id', 'Username'], refresh: true }
  ]

  constructor() {}

  ngOnInit() {}
}
