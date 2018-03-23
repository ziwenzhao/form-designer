import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/event.service';

@Component({
  selector: 'setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  private component = false;

  constructor(private eventService: EventService) { }

  clickTab(e){
    if (e.currentTarget.getAttribute('data-tabName') === 'component') {
      this.component = true
    } else {
      this.component = false
    }
  }
  
  ngOnInit() {
    let self = this;
    this.eventService.changeTab.subscribe( bool => {
      self.component = bool
    })
  }
}
