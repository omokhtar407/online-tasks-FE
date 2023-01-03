import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getUserTasks(userId:string , tasksParams:any) {
      let params = new HttpParams();
      Object.entries(tasksParams).forEach(([key,value]:any)=>{
        params = params.append(key,value);
      });

    return this.http.get(environment.baseApi + 'tasks/user-tasks/' + userId , {params})
  }

  completeUserTask(payload:any){
    return this.http.put(environment.baseApi + `tasks/complete`,payload)
  }

  taskDetails(id:string){
    return this.http.get(environment.baseApi + `tasks/task/` + id)
  }


  deleteTask(id:string){
    return this.http.delete(environment.baseApi + `tasks/delete-task/`+ id)
  }

  updateTask(model:any, id:string){
    return this.http.put(environment.baseApi + `tasks/edit-task/` + id,model)
  }
}
