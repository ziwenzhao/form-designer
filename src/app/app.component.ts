import { DataService } from 'app/data-service';
import { EventService } from './event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private isstart = false;
  private componentView ;
  constructor(public eventService: EventService){}

  ngOnInit(){
    let self = this
    this.eventService.movestart.subscribe( obj =>{
      self.isstart = true
      self.componentView = obj.componentView
    })
  }

  move(e) {
    if (this.isstart) {
      document.querySelector('html').classList.add('wf-cursor-move')
      let obj = {
        componentName: this.componentView.componentName,
        clientX: e.clientX,
        clientY: e.clientY
      }
      this.eventService.moveInCanvas.next(obj);
      this.eventService.move.next(e);
    }
  }

  moveend(e) {
    if (this.isstart) {
      let obj = {
        componentView: this.componentView
      }
      this.eventService.moveend.next(obj);
      this.isstart = false
    }
  }


}
