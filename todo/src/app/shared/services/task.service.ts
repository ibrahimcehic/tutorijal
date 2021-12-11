import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = "./assets/task.json"

  constructor(public http:HttpClient) { }
  getTask(): Observable<ITask[]>{
    return this.http.get<ITask[]>(this.url)
}}
