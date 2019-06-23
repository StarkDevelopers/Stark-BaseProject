import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './utils/material.module';
import { PrimeModule } from './utils/prime.module';
import { StarkRoutingModule } from './utils/app-routing.module';
import { UserManageComponent } from './admin/user/manage/user.manage.component';
import { UserListComponent } from './admin/user/list/user.list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserService } from './admin/user/user.service';
import { DatatableComponent } from './utils/datatable/datatable.component';

@NgModule({
  declarations: [
    AppComponent,
    UserManageComponent,
    DashboardComponent,
    UserListComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimeModule,
    StarkRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    { provide: 'UserService', useExisting: UserService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
