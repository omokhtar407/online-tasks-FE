import { MaterialModule } from './../../material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

@NgModule({
  declarations: [ListTasksComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialModule,
    NgxPaginationModule,
  ],
})
export class TasksModule {}
