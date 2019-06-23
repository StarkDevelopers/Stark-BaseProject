import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { UserManageComponent } from '../admin/user/manage/user.manage.component';
import { NgModule } from '@angular/core';
import { UserListComponent } from '../admin/user/list/user.list.component';

const appRoutes: Routes = [
    {
        path: '', component: DashboardComponent
    },
    {
        path: 'users', component: UserListComponent
    },
    {
        path: 'user/manage', component: UserManageComponent
    }
];

@NgModule(
    {
        imports: [
            RouterModule.forRoot(appRoutes)
        ],
        exports: [
            RouterModule
        ]
    }
)
export class StarkRoutingModule { }