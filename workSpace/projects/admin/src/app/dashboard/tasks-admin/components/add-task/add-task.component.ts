import { Component, OnInit, Inject } from '@angular/core';
import { ListTasksService } from './../../servises/list-tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  checkFormVal: any;
  imgFile: string = ``;
  users: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public userData: any,
    private fb: FormBuilder,
    private ListTasksSer: ListTasksService,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private matDialog: MatDialog,
    private toastr: ToastrService,
    private userService: UsersService
  ) {
    this.getUsersDataFromBeh();
  }

  selectFile(event: any) {
    this.imgFile = event.target.value;
    this.taskForm.get('image')?.setValue(event.target.files[0]);
  }

  get f() {
    return this.taskForm.controls;
  }

  addTask() {
    let data = this.preparedFormData();
    this.ListTasksSer.createTask(data).subscribe((res) => {
      this.toastr.success('Task Created Successfully');
      this.dialogRef.close(true);
    });
  }

  updateTask() {
    let data = this.preparedFormData();
    this.ListTasksSer.updateTask(data, this.userData._id).subscribe((res) => {
      this.toastr.success('Task Updated Successfully');
      this.dialogRef.close(true);
    });
  }

  preparedFormData() {
    let newDate = moment(this.taskForm.value['deadline']).format('DD/MM/YYYY');
    let formData = new FormData();
    Object.entries(this.taskForm.value).forEach(([key, value]: any) => {
      if (key === 'title') {
        formData.append(key, value.toLowerCase());
      } else if (key === 'deadline') {
        formData.append(key, newDate);
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  }

  // Behavior Subject
  getUsersDataFromBeh() {
    this.userService.usersData.subscribe((res: any) => {
      this.users = this.MappingUsersData(res.data);
    });
  }

  MappingUsersData(users: any[]) {
    let newUsers = users?.map((user) => {
      return {
        id: user._id,
        name: user.username,
      };
    });
    return newUsers;
  }
  buildForm() {
    this.taskForm = this.fb.group({
      title: [
        this.userData?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      userId: [this.userData?.userId?._id || '', Validators.required],
      image: [this.userData?.image || '', Validators.required],
      description: [this.userData?.description || '', Validators.required],
      deadline: [
        this.userData
          ? new Date(
              this.userData?.deadline.split('/').reverse().join('/')
            ).toISOString()
          : '',
        Validators.required,
      ],
    });
    this.checkFormVal = this.taskForm.value;
  }

  closeDialog() {
    let hasChange = false;
    Object.keys(this.checkFormVal).forEach((key) => {
      if (this.checkFormVal[key] !== this.taskForm.value[key]) {
        hasChange = true;
      }
    });

    if (hasChange) {
      const dialog = this.matDialog.open(ConfirmationComponent, {
        width: '500px',
        disableClose: true,
      });
    } else {
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }
}
