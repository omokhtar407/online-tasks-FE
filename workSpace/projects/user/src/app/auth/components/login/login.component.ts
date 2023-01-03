import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide:boolean = true;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authSer: AuthService,
    private toastr: ToastrService,
    private _Router: Router,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required],
      role:'user'
    });
  }


  get f(){
    return this.loginForm.controls;
  }

  login() {
    this.authSer.login(this.loginForm.value).subscribe(
      (res:any) => {
        localStorage.setItem('userToken',res.token);
        this.toastr.success('Success', 'Register success');
        this._Router.navigate(['/dashboard/tasks']);
      }
    );

  }

}
