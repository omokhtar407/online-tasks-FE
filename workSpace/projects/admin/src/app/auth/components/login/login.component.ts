
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private LoginSer: LoginService,
    private toastr: ToastrService,
    private _Router: Router,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  get f(){
    return this.loginForm.controls;
  }

  login() {
    this.LoginSer.login(this.loginForm.value).subscribe(
      (res:any) => {
        localStorage.setItem('token',res.token);
        this.toastr.success('Success', 'login success');
        this._Router.navigate(['/dashboard/tasks']);
      },(error)=>{
        this.toastr.error('Invalid email or password');
      }
    );
  }
  buildForm() {
    this.loginForm = this.fb.group({
      email: ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['admin'],
    });
  }
}
