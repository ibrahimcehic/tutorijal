import { Component, OnInit } from '@angular/core';
import { ITask } from '../shared/models/task';
import { TaskService } from '../shared/services/task.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {
  tasks: ITask[] = [];

  constructor(private service: TaskService ) { }

  ngOnInit(): void {
    this.service.getTask().subscribe(tasks =>{ this.tasks = tasks})
  }

}
