import { Component, ViewChild, OnInit, Input, Injector, InjectionToken } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataTableDataSource } from 'src/app/utils/datatable/datatable.datasource';
import { SubjectService } from 'src/app/common/subjects/subject.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: []
})
export class DatatableComponent implements OnInit {
  @Input()
  columns: string[];
  showColumns: string[];
  @Input()
  sortColumns: string[];
  @Input()
  service: string;

  data: DataTableDataSource;

  subjectService: SubjectService;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this.showColumns = Object.assign([], this.columns);
    this.columns.push('Action');

    this.subjectService = this.injector.get(this.service);

    this.data = new DataTableDataSource(this.subjectService);
    this.data.loadSubjects('', '', 0, 5, '');
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadSubjects())
      )
      .subscribe();
  }

  loadSubjects() {
    this.data.loadSubjects(
      this.sort.active ? this.sort.active : '',
      this.sort.direction ? this.sort.direction : '',
      this.paginator.pageIndex,
      this.paginator.pageSize,
      ''
    );
  }
}
