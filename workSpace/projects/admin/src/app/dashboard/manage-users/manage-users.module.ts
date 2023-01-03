import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from '../../material/material.module';
@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ManageUsersRoutingModule,
    MaterialModule
  ]
})
export class ManageUsersModule { }
