import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';

const routes: Routes = [
  {path: '', component:ListTasksComponent},
  {path: 'add-task', component:AddTaskComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksAdminRoutingModule { }
