import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  createList(title : string){
    return this.service.post('lists',{title});
  }
  constructor(private service : WebRequestService) { }
}
