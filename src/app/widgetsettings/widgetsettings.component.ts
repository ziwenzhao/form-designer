import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/event.service';

@Component({
  selector: 'widgetsettings',
  templateUrl: './widgetsettings.component.html',
  styleUrls: ['./widgetsettings.component.css']
})
export class WidgetsettingsComponent implements OnInit {
  private supportSetting :any = {};

  constructor(private eventService: EventService) { }

  ngOnInit() {
    let self = this;
    this.eventService.selectComponent.subscribe( obj => {
      self.supportSetting = {}
      for (let i = 0; i < obj.supportSetting.length; i++) {
        self.supportSetting[obj.supportSetting[i]] = true
      }
      self.supportSetting = Object.assign({}, self.supportSetting, obj)
    })
  }

  add(e){
    e.stopPropagation();
    e.preventDefault();
    let index = e.currentTarget.getAttribute('data-index');
    for (let i = 0, l = this.supportSetting.defaultOptions.length; i < l; i++) {
      let has = false;
      for (let item in this.supportSetting.defaultOptions) {
        if (this.supportSetting.defaultOptions[item].idx == (i + 1)) {
          has = true
        }
      }
      if (!has) {
        this.supportSetting.defaultOptions.splice((+index + 1), 0, { idx: i + 1, text: '选项' + (i + 1) })
        return
      }
    }
    if (index == this.supportSetting.defaultOptions.length - 1) {
      this.supportSetting.defaultOptions.push({
        idx: (this.supportSetting.defaultOptions.length + 1),
        text: 'Option' + (this.supportSetting.defaultOptions.length + 1)
      })
    } else {
      this.supportSetting.defaultOptions.splice((+index + 1), 0, {
        idx: (this.supportSetting.defaultOptions.length + 1),
        text: 'Option' + (this.supportSetting.defaultOptions.length + 1)
      })
    }
  }

  del(e){
    e.stopPropagation()
    e.preventDefault()
    let index = e.currentTarget.getAttribute('data-index');
    this.supportSetting.defaultOptions.splice(index, 1)
  }

  changeComponent(){
    this.eventService.changeComponent.next(this.supportSetting);
  }
}
