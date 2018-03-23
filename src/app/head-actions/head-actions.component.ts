import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/event.service';

@Component({
  selector: 'headactions',
  templateUrl: './head-actions.component.html',
  styleUrls: ['./head-actions.component.css']
})
export class HeadActionsComponent  {

  constructor(private eventService: EventService) { }

  private isdisable = false;
  
  
  save() {
    this.eventService.save.next();
  }

}
