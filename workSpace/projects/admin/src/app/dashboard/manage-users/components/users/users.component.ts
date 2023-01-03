import { UsersService } from './../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment.prod';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = [
    'position',
    'username',
    'email',
    'assignedTasks',
    'actions',
  ];
  imgPrefix = environment.baseApi;
  currPage: number = 1;
  totalPages: number = 0;
  filtration: any = {
    page: this.currPage,
    limit: 5,
  };
  timeOutId: any;
  constructor(private userSer: UsersService, private toastr: ToastrService) {
    this.getUsersDataFromBeh();
  }

  searchUser(event: any) {
    this.filtration['name'] = event.value.toLowerCase();
    this.currPage = 1;
    this.filtration['page'] = this.currPage;

    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getAllUsers();
    }, 2000);
  }


  getAllUsers() {
    this.userSer.getUsersData(this.filtration)
  }

  // Behavior Subject
  getUsersDataFromBeh(){
    this.userSer.usersData.subscribe((res:any)=>{
      this.users = res.data;
      this.totalPages = res.total;
    });
  }

  deleteUser(id: string, index: number) {
    if (this.users[index].assignedTasks > 0) {
      this.toastr.error("You can't delete user until he finish his tasks");
    } else {
      this.userSer.deleteUser(id).subscribe((res: any) => {
        this.toastr.success('User Deleted Successfully');
        this.getAllUsers();
      });
    }
  }

  changeStatus(id: string, status: string, index: number) {
    const payload = {
      id,
      status,
    };

    if (this.users[index].assignedTasks > 0) {
      this.toastr.error(
        "You can't change user status until he finish his tasks"
      );
    } else {
      this.userSer.changeStatus(payload).subscribe((res: any) => {
        console.log(res);
        this.toastr.success('User Status Changed Successfully');
        this.getAllUsers();
      });
    }
  }

  handlePageChange(event: any) {
    this.currPage = event;
    this.filtration['page'] = this.currPage;
    this.getAllUsers();
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
}
