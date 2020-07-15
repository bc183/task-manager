import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private service: TaskService) { }

  ngOnInit(): void {
  }

  createNewList(){
    this.service.createList('Testing').subscribe((res:any)=>{
      console.log(res);
      
    });
  }

}
