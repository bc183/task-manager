import { List } from './../../models/list.model';
import { Task } from './../../models/task.model';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists : List[];
  tasks : Task[];
  constructor(public service: TaskService,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.service.getTasks(params.listId).subscribe((tasks: any[])=>{
        this.tasks=tasks;
        console.log(tasks);
        
      });
    });

    this.service.getLists().subscribe((lists:any[])=>{
      this.lists = lists;
      
    }); 
  }

  onTaskClick(task : Task){
    this.service.complete(task).subscribe(()=>{
      task.completed=!task.completed;
    });
  }

  

}
