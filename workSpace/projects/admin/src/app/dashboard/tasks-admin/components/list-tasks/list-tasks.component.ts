import { ListTasksService } from './../../servises/list-tasks.service';
import { Component, OnInit } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { environment } from 'projects/admin/src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  users:any[] =[];
  UsersData:any[] = [];
  displayedColumns: string[] = ['position','image', 'title', 'user', 'deadline', 'status','actions'];
  imgPrefix = environment.baseApi;
  currPage:number = 1;
  totalPages:number = 0;
  filtration:any = {
    page:this.currPage,
    limit:5
  };
  timeOutId:any;
  constructor(
    private ListTasksSer:ListTasksService,
    private dialog: MatDialog,
    private toastr:ToastrService,
    private userService:UsersService

  ) {this.getUsersDataFromBeh();}

  getUsers(){
    this.userService.getUsersData();
  }

   // Behavior Subject
  getUsersDataFromBeh(){
    this.userService.usersData.subscribe((res:any)=>{
      this.UsersData = this.MappingUsersData(res.data);
      this.totalPages = res.total;
    });
  }

  MappingUsersData(users:any[]){
    let newUsers = users?.map((user) =>{
      return {
        id:user._id,
        name:user.username
      }
    })
    return newUsers;
  }

  searchTask(event:any){
    this.filtration['keyword'] = event.value.toLowerCase();

    this.currPage = 1;
    this.filtration['page'] = this.currPage;

    clearTimeout(this.timeOutId);
    this.timeOutId =  setTimeout(() => {
      this.getAllTasks();
    },2000)
  }

  selectUser(event:any){
    this.filtration['userId'] = event.value;

    this.currPage = 1;
    this.filtration['page'] = this.currPage;

    this.getAllTasks();
  }

  selectUserStatus(event:any){
    this.filtration['status'] = event.value;

    this.currPage = 1;
    this.filtration['page'] = this.currPage;

    this.getAllTasks();
  }

  selectDate(event:any , type:string){
    this.currPage = 1;
    this.filtration['page'] = this.currPage;

    this.filtration[type] = moment(event.value).format('DD/MM/YYYY');
    if(type == 'toDate' && this.filtration[type] !== 'Invalid date'){
      this.getAllTasks();
    }
  }

  getAllTasks(){
    this.ListTasksSer.getAllTasks(this.filtration).subscribe((res:any) =>{
      this.totalPages = res.totalItems;
      this.users = this.mappingUserData(res.tasks);
    })
  }

  mappingUserData(users:any[]){
    let newUsers = users.map((user) =>{
      return {
        ...user,
        user:user.userId.username
      }
    })

    return newUsers;
  }

  addTask(){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:'500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.getAllTasks();
      }
    });
  }

  deleteTask(id:string){
    this.ListTasksSer.deleteTask(id).subscribe((res:any) =>{
      this.toastr.success("Task Deleted Successfully");
      this.getAllTasks();
    })
  }

  updateTask(userData:any){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:'500px',
      data:userData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.getAllTasks();
      }
    });
  }

  handlePageChange(event:any){
    this.currPage = event;
    this.filtration['page'] = this.currPage;
    this.getAllTasks();
  }

  ngOnInit(): void {
    this.getUsers();
    this.getAllTasks();
  }

}
