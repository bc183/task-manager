import { Task } from './../../models/task.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private service : TaskService, private route : ActivatedRoute, private router : Router) { }

  listId: string;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.listId = params['listId'];
      console.log(this.listId);
    });
  }

  createTask(title : string){
    this.service.createTask(title,this.listId).subscribe((newTask : Task)=>{
      this.router.navigate(['../'],{relativeTo: this.route});
    });
  }

}
