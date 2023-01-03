import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListTasksService {

  constructor(private http:HttpClient) { }

  getAllTasks(filter:any){
    let params =new HttpParams();
    Object.entries(filter).forEach(([key , value]:any)=>{
      if(value){
        params = params.append(key,value);
      }
    })
    return this.http.get(environment.baseApi + `tasks/all-tasks` ,{params})
  }

  createTask(model:any){
    return this.http.post(environment.baseApi + `tasks/add-task`,model)
  }

  deleteTask(id:string){
    return this.http.delete(environment.baseApi + `tasks/delete-task/`+ id)
  }

  updateTask(model:any, id:string){
    return this.http.put(environment.baseApi + `tasks/edit-task/` + id,model)
  }

  getAllUsers(){
    return this.http.get(environment.baseApi + `auth/users`)
  }
}
