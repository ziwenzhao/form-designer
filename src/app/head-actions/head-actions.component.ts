import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/event.service';
import { NzNotificationService } from 'ng-zorro-antd';
// import * as firebase from 'firebase';
@Component({
  selector: 'headactions',
  templateUrl: './head-actions.component.html',
  styleUrls: ['./head-actions.component.css']
})
export class HeadActionsComponent  {
  // private db = firebase.firestore();
  constructor(private eventService: EventService, private _notification: NzNotificationService) { }

  private isdisable = false;

  save() {
    this.eventService.save.next();
    this._notification.create('success', 'Save Success', '');
  }

}
