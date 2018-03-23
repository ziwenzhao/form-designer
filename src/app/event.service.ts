import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventService {
  
  public move = new Subject<any>();
  public moveInCanvas = new Subject<any>();
  public movestart = new Subject<any>();
  public moveend = new Subject<any>();
  public save = new Subject<any>();
  public changeTab = new Subject<any>();
  public dragend = new Subject<any>();
  public changeInfo = new Subject<any>();
  public changeComponent = new Subject<any>();
  public selectComponent = new Subject<any>();

  constructor() { }

}
