

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';
import { createAccount, Login } from '../context/DTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  createAcc(model:createAccount){
    return this.http.post( environment.baseApi +  `auth/createAccount`,model)
  }

  login(model:Login){
    return this.http.post( environment.baseApi +  `auth/login`,model)
  }
  
}
