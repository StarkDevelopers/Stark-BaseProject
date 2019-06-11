import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { UserComponent } from '../admin/user/user.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {
        path: '', component: DashboardComponent
    },
    {
        path: 'users', component: UserComponent
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