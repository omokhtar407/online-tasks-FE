import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { createAccount } from '../../context/DTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide:boolean = true;
  hide1:boolean = true;
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authSer: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.fb.group({
      username: ['',[ Validators.required, Validators.minLength(5)]],
      email: ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },{validators:this.checkPassword});
  }

  checkPassword:ValidatorFn = (group:AbstractControl):ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {notSame:true}
  }

  get f(){
    return this.registerForm.controls;
  }

  createAccount() {

    const UserModel :createAccount ={
      username: this.f['username'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      role: 'user'
    }

    this.authSer.createAcc(UserModel).subscribe(
      (res:any) => {
        this.toastr.success('Success', 'Register success');
      }
    );

  }

}
