import { TasksService } from './../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'projects/user/src/environments/environment';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  taskDetails: any;
  taskId:any;
  imgPrefix: string = environment.baseApi;
  constructor(
    private tasksSer: TasksService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((res: any) => {
      this.taskId = res.params['id'];
    })
  }

  completeTask() {
    const payload = {
      id: this.taskId
    };

    this.tasksSer.completeUserTask(payload).subscribe((res: any) => {
      this.toastr.success('Task completed successfully');
      this.router.navigate(['/tasks'])
    });
  }

  TaskDetails() {
    this.tasksSer.taskDetails(this.taskId).subscribe((res: any) => {
      this.taskDetails = res.tasks;
    });
  }
  ngOnInit(): void {
    this.TaskDetails();
  }
}
