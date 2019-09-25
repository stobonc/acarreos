import { Injectable } from '@angular/core';

import {Task}from'./../interface/task';  /****** se inserta la interface******/
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private api ='https://jsonplaceholder.typicode.com/todos';

  constructor(
    private http:HttpClient
  ) { }

  getAllTasks(){
   // const path='https://jsonplaceholder.typicode.com/todos';
   const path ='${this.api}/todos';
    return this.http.get<Task[]>(path);
  }
  getTask(id:string){
    const path ='${this.api}/todos/${id}';
    return this.http.get<Task>(path);

  }
}
