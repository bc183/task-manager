import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private service : WebRequestService) { }

  createList(title : string){
    return this.service.post('lists',{title});
  }

  createTask(title : string, listId: string){
    return this.service.post(`lists/${listId}/tasks`,{title});
  }


  getLists(){
    return this.service.get('lists');
  }

  getTasks(listId){
    return this.service.get(`lists/${listId}/tasks`);
  }

  complete(task : Task){
    return this.service.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed: !task.completed
    });
  }
}
