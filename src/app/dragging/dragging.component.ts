import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/event.service';

@Component({
  selector: 'dragging',
  templateUrl: './dragging.component.html',
  styleUrls: ['./dragging.component.css']
})
export class DraggingComponent implements OnInit {
  private componentName = '';
  private componentText = '';
  private cc : any;
  private isstart =  false;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    let self = this;
    this.eventService.movestart.subscribe( obj => {
      self.cc = Object.assign({}, self.cc, {
        display: 'none',
        top: obj.clientY + 'px',
        left: obj.clientX + 'px'
      })
      self.componentName = obj.componentName
      self.componentText = obj.componentText
      self.isstart = true
    });
    this.eventService.move.subscribe( obj => {
      if (!self.isstart) {
        return
      }
      let clientX = obj.clientX
      let clientY = obj.clientY
      let startX = parseInt(self.cc.left);
      let startY = parseInt(self.cc.top);
      let moveX = clientX - startX + 'px'
      let moveY = clientY - startY + 'px'
      self.cc = Object.assign({}, self.cc, {
        display: 'block',
        top: startY + 'px',
        left: startX + 'px',
        transform: 'translate3d(' + moveX + ',' + moveY + ',0)'
      })
    })
    this.eventService.dragend.subscribe( obj =>{
      self.isstart = false
      let startX = self.cc.left;
      let startY = self.cc.top;
      self.cc = Object.assign({}, self.cc, {
        display: 'none',
        top: startY + 'px',
        left: startX + 'px'
      });
      document.querySelector('html').classList.remove('wf-cursor-move');
    })
  }
}
