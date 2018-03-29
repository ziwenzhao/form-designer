import { DataService } from 'app/data-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'formrenderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css']
})
export class FormRendererComponent implements OnInit {
  private repeat = 1;
  private arr = [1];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log()
  }

  onShow(){
    console.log(this.dataService.components);
  }

  onClick(){
    this.repeat++;
    this.arr.push(this.repeat);
  }

}
