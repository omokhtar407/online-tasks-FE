import { ToastrService } from 'ngx-toastr';
import { environment } from 'projects/user/src/environments/environment';
import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  userData: any;
  userTasks: any[] = [];
  currPage: number = 1;
  totalPages: number = 0;
  selectedStatus: string = 'In-Progress';
  imgPrefix: string = environment.baseApi;
  constructor(private tasksSer: TasksService, private toastr: ToastrService) {}

  getUserData() {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    this.userData = JSON.parse(atob(token.split(".")[1]));
  }
  getAllTasks() {
    let params = {
      page: this.currPage,
      status: this.selectedStatus,
    };
    this.tasksSer
      .getUserTasks(this.userData.userId, params)
      .subscribe((res: any) => {
        this.userTasks = res.tasks;
        this.totalPages = res.tasks.length;
      }, (error)=>{
        this.userTasks = [];
      });
  }
  completeTask(taskId: string) {
    const payload = {
      id: taskId
    }
    this.tasksSer.completeUserTask(payload).subscribe((res: any) => {
      this.toastr.success('Task completed successfully');
      this.getAllTasks();
    });
  }

  handlePageChange(event: any) {
    this.currPage = event;
    this.getAllTasks();
  }
  ngOnInit(): void {
    this.getUserData();
    this.getAllTasks();
  }
}
