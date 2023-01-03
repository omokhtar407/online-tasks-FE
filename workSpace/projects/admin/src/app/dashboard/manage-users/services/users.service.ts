import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersData = new BehaviorSubject({});

  constructor(private http:HttpClient) { }

  getAllUsers(filter:any){
    let params =new HttpParams();
    if(filter){
      Object.entries(filter).forEach(([key , value]:any)=>{
        if(value){
          params = params.append(key,value);
        }
      })
    }
    return this.http.get(environment.baseApi + `auth/users` ,{params})
  }

  deleteUser(id:string){
    return this.http.delete(environment.baseApi + `auth/user/`+ id)
  }

  changeStatus(model:any){
    return this.http.put(environment.baseApi + `auth/user-status` , model)
  }

  getUsersData(model?:any){
    this.getAllUsers(model).subscribe((res:any)=>{
      this.usersData.next({
        data:res.users,
        total:res.totalItems
      })
    })
  }
}
