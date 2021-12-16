import { Component, OnInit } from '@angular/core';
import { ITask } from '../shared/models/task';
import { TaskService } from '../shared/services/task.service';
import {Modal} from 'bootstrap' 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit 
{
  tasks: ITask[] = [];

  task: any;
  zavrsen: boolean = false;
  date1: Date = new Date();
  alertBoja: string = '';
  indexDelete: number = 0;;

  constructor(private service: TaskService ) { }

  ngOnInit(): void 
  {
    this.service.getTask().subscribe(tasks =>{ this.tasks = tasks})
  }

add(modalElement: any)
{
   this.task = {
     id: 0,
     opis: '',
     datumZavrsetka: '',
     status:false
    }
  const modal = new Modal(modalElement);
  modal.show();
}
saveNew(task: ITask)
{
  this.tasks.push(task);
}

delete(id: number, modalElement: any)
{
  let index = this.tasks.findIndex(taskLista => taskLista.id == id);
  this.indexDelete = index;
  if(this.tasks[index].status)
   {
    this.tasks.splice(index,1);
   }
   else{
    const modal2 = new Modal(modalElement);
    modal2.show();
   } 
  
}
deleteAlert()
{
  this.tasks.splice(this.indexDelete,1);

}

statusUpdate(id: number)
{
  let index = this.tasks.findIndex(idS => idS.id == id );
  this.tasks[index].status = !this.tasks[index].status;
  this.zavrsen = this.tasks[index].status;
  //console.log('check box change');
  //console.log(this.date1.getTime());
  
}
provjeraVremena(datum: Date, zavrsen:boolean)
{
  const vrijemeZ = new Date(datum);
  const vrijeme= new Date();
  let vrijemeE = new Date();
  vrijemeE.setTime(86400000);
console.log('Status: ', zavrsen);

   if(((vrijemeZ.getTime() - vrijeme.getTime())< vrijemeE.getTime()) && zavrsen == false)
  {
    return 'red';
   }
    else{
    return 'white';
    }  
  
}
}
