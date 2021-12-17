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
  indexDelete: number = 0;
  type: string = '';
   
  indPom: number = 0;

  constructor(private service: TaskService ) { }

  ngOnInit(): void 
  {
    this.service.getTask().subscribe(tasks =>{ this.tasks = tasks})
  }

add(modalElement: any)
{
   this.task = {
     id: Math.round(Math.random()*10000),
     opis: '',
     datumZavrsetka: '',
     status:false
    }
    this.type = 'add';
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
    //console.log('Status: ', zavrsen);

   if(((vrijemeZ.getTime() - vrijeme.getTime())< vrijemeE.getTime()) && zavrsen == false)
  {
    return 'red';
   }
    else{
    return 'white';
    }  
  
}
update(task: ITask, modalElement: any){
  this.task = {
    id: task.id,
    opis: task.opis,
    datumZavrsetka: task.datumZavrsetka,
    status: task.status,
  }

  let index = this.tasks.findIndex(idS => idS.id == task.id );
  this.indPom = index;
  console.log('Index: ', this.indPom);
  
  this.type = 'edit';
  const modal = new Modal(modalElement);
  modal.show();
}
saveEdit(){
// let index = this.task.findIndex(element => element.id == this.task.id);
//   this.task[index] = this.task;  

console.log(this.task.id)
console.log(this.tasks)

this.tasks = this.tasks.filter(e => e.id !== this.task.id )
this.tasks.push(this.task)

this.tasks.sort((a,b) => a.id - b.id)

}
}
