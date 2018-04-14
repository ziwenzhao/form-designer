import { DataService } from 'app/data-service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EventService } from 'app/event.service';
import { debug } from 'util';

@Component({
  selector: 'formcanvas',
  templateUrl: './formcanvas.component.html',
  styleUrls: ['./formcanvas.component.css']
})
export class FormcanvasComponent implements OnInit{
  private title = '请假';
  private description = '';
  private icon = '//gw.alicdn.com/tps/TB1zXtqOpXXXXa6XXXXXXXXXXXX-102-102.png';
  private isempty = true;
  private left = 0;
  private top = 0;
  private width = 0;
  private height = 0;
  private InCanvas = null;
  private components = [];
  private selected = null;
  private domArr = [];
  private isDrag = false;
  private dragIndex = null;
  private tabIndex = null;
  //拖动的时候 明细组件的index
  private parNodeIndex = null;
  constructor(private eventService: EventService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.components = this.components;
    let self = this
    this.eventService.moveInCanvas.subscribe( obj => {
      //当鼠标在中间可拖动区域
      if (obj.clientX >= self.left && obj.clientY >= self.top && obj.clientX <= self.left + self.width && obj.clientY <= self.top + self.height) {
        //鼠标距离可拖动区域顶部的距离
        let topInCanvas = obj.clientY - self.top;

        if (self.domArr.length <= 0) {
          self.InCanvas = 0;
          self.tabIndex = null;
        } else if (self.domArr.length === 1) {
          if (obj.componentName == 'tablefield') {
            if (topInCanvas <= self.domArr[0].middle) {
              self.InCanvas = 0;
              self.tabIndex = null;
            } else if (topInCanvas > self.domArr[0].middle) {
              self.InCanvas = 1;
              self.tabIndex = null;
            }
          } else {
            if (topInCanvas <= self.domArr[0].middle_top) {
              self.InCanvas = 0;
              self.tabIndex = null;
            } else if (topInCanvas > self.domArr[0].middle_lower) {
              self.InCanvas = 1;
              self.tabIndex = null;
            } else if (topInCanvas <= self.domArr[0].middle_lower && topInCanvas > self.domArr[0].middle_top) {
              let item = self.domArr[0];
              self.InCanvas = null;
              self.tabIndex = 0;
              if (item.domArr.length <= 0 || topInCanvas <= item.domArr[0].middle_top) {
                self.components[0].InTableCanvas = 0
              } else if (topInCanvas > item.domArr[item.domArr.length - 1].middle_lower) {
                self.components[0].InTableCanvas = item.domArr.length
              } else if (item.domArr.length > 1) {
                for (let m = 0, n = item.domArr.length - 1; m < n; m++) {
                  if (topInCanvas > item.domArr[m].middle_lower && topInCanvas <= item.domArr[m + 1].middle_top) {
                    self.components[0].InTableCanvas = m + 1
                  }
                }
              }
            }
          }
        } else {
          //中间已有组件数量大于1
          if (obj.componentName == 'tablefield') {
            if (topInCanvas <= self.domArr[0].middle) {
              self.InCanvas = 0;
              self.tabIndex = null;
            } else if (topInCanvas > self.domArr[self.domArr.length - 1].middle) {
              self.InCanvas = self.domArr.length;
              self.tabIndex = null;
            } else {
              for (let i = 0, l = self.domArr.length; i < l - 1; i++) {
                let item = self.domArr[i];
                let nextItem = self.domArr[i + 1];
                if (topInCanvas > item.middle && topInCanvas <= nextItem.middle) {
                  self.InCanvas = i + 1;
                  self.tabIndex = null;
                  self.components[i].InTableCanvas = null
                }
              }
              /* //当最后一个组件是明细组件时
               if (topInCanvas <= self.domArr[self.domArr.length - 1].middle_lower && topInCanvas > self.domArr[self.domArr.length - 1].middle_top) {
               let item = self.domArr[self.domArr.length - 1];
               self.InCanvas = null;
               self.tabIndex = self.domArr.length - 1;
               if (item.domArr.length <= 0 || topInCanvas <= item.domArr[0].middle_top) {
               self.components[self.domArr.length - 1].InTableCanvas = 0
               } else if (topInCanvas > item.domArr[item.domArr.length - 1].middle_lower) {
               self.components[self.domArr.length - 1].InTableCanvas = item.domArr.length
               } else {
               for (let m = 0, n = item.domArr.length - 1; m < n; m++) {
               if (topInCanvas > item.domArr[m].middle_lower && topInCanvas <= item.domArr[m + 1].middle_top) {
               self.components[i].InTableCanvas = m + 1
               }
               }
               }
               }*/
            }
          } else {
            if (topInCanvas <= self.domArr[0].middle_top) {
              self.InCanvas = 0;
              self.tabIndex = null;
            } else if (topInCanvas > self.domArr[self.domArr.length - 1].middle_lower) {
              self.InCanvas = self.domArr.length;
              self.tabIndex = null;
            }
            else {
              for (let i = 0, l = self.domArr.length; i < l - 1; i++) {
                let item = self.domArr[i];
                let nextItem = self.domArr[i + 1];
                //在明细组件里面
                if (topInCanvas > item.middle_top && topInCanvas <= item.middle_lower) {
                  self.InCanvas = null;
                  self.tabIndex = i;
                  if (item.domArr.length <= 0 || topInCanvas <= item.domArr[0].middle_top) {
                    self.components[i].InTableCanvas = 0
                  } else if (topInCanvas > item.domArr[item.domArr.length - 1].middle_lower) {
                    self.components[i].InTableCanvas = item.domArr.length
                  } else {
                    for (let m = 0, n = item.domArr.length - 1; m < n; m++) {
                      if (topInCanvas > item.domArr[m].middle_lower && topInCanvas <= item.domArr[m + 1].middle_top) {
                        self.components[i].InTableCanvas = m + 1
                      }
                    }
                  }
                } else if (topInCanvas > item.middle_lower && topInCanvas <= nextItem.middle_top) {
                  self.InCanvas = i + 1;
                  self.tabIndex = null;
                  self.components[i].InTableCanvas = null
                }

              }
              //当最后一个组件是明细组件时
              if (topInCanvas <= self.domArr[self.domArr.length - 1].middle_lower && topInCanvas > self.domArr[self.domArr.length - 1].middle_top) {
                let item = self.domArr[self.domArr.length - 1];
                self.InCanvas = null;
                self.tabIndex = self.domArr.length - 1;
                if (item.domArr.length <= 0 || topInCanvas <= item.domArr[0].middle_top) {
                  self.components[self.domArr.length - 1].InTableCanvas = 0
                } else if (topInCanvas > item.domArr[item.domArr.length - 1].middle_lower) {
                  self.components[self.domArr.length - 1].InTableCanvas = item.domArr.length
                } else {
                  for (let m = 0, n = item.domArr.length - 1; m < n; m++) {
                    if (topInCanvas > item.domArr[m].middle_lower && topInCanvas <= item.domArr[m + 1].middle_top) {
                      self.components[m].InTableCanvas = m + 1
                    }
                  }
                }
              }
            }
          }
        }

        if (self.tabIndex != null) {
          self.InCanvas = null
        } else {
          self.InCanvas = self.InCanvas || 0
        }
        if (self.InCanvas != null) {
          for (let i = 0, l = self.components.length; i < l; i++) {
            self.components[i].InTableCanvas = null
          }
        }
      }
      else {
        self.InCanvas = null;
        self.tabIndex = null;
        for (let i = 0, l = self.components.length; i < l; i++) {
          self.components[i].InTableCanvas = null
        }
      }
    })
    this.eventService.moveend.subscribe( obj => {
      let component:any;
      component = JSON.stringify(obj);
      component = JSON.parse(component);
      let componentsLength = self.getcomponents();
      console.log(componentsLength)
      this.eventService.dragend.next(obj);
      //拖动到非明细组件里面
      if (self.InCanvas != null) {
        //拖动现在已有组件
        if (self.isDrag) {
          self.dragIndex = self.dragIndex >> 0;
          //如果以前在明细组件里面
          if (self.parNodeIndex != null) {
            let dragItem = self.components[self.parNodeIndex].components[self.dragIndex];
            self.components[self.parNodeIndex].components.splice(self.dragIndex, 1);
            self.components.splice(self.InCanvas, 0, dragItem);
            self.selected = self.components.indexOf(dragItem);
          } else {
            if (self.dragIndex != self.InCanvas - 1 && self.dragIndex != self.InCanvas) {
              let dragItem = self.components[self.dragIndex];
              self.components.splice(self.dragIndex, 1);
              self.components.splice(self.InCanvas, 0, dragItem);
              self.selected = self.components.indexOf(dragItem);
            } else {
              let dom = self.queryDomByIndex(document, self.dragIndex);
              dom.classList.remove('draging');
            }
          }
          self.dragIndex = null;
          self.isDrag = false;
        } else {
          //添加新组件
          let idx = 0;
          for (let i = 0; i < self.components.length; i++) {
            let item = self.components[i];
            if (item.name == component.componentView.name) {
              idx++;
            }
          }
          component.componentView.idx = componentsLength;
          if (idx > 0) {
            component.componentView.defaultLable = component.componentView.defaultLable + "（" + idx + "）";
          }
          if (self.InCanvas > 0) {
            self.components.splice(self.InCanvas, 0, component.componentView);
          } else if (self.InCanvas == 0) {
            self.components.unshift(component.componentView);
          }
          self.selected = self.components.indexOf(component.componentView);
          this.eventService.changeTab.next(true);
          this.eventService.selectComponent.next(component.componentView);
        }
        self.InCanvas = null;
        //拖动到明细组件里面
      } else if (self.tabIndex != null) {
        //拖动现有组件
        if (self.isDrag) {
          //在明细组件里面的位置
          let inTabIndex = self.components[self.tabIndex].InTableCanvas >> 0;
          self.dragIndex = self.dragIndex >> 0;
          //  self.parNodeIndex = self.parNodeIndex >> 0;
          //如果从明细组件里面拖到外面
          if (self.parNodeIndex == null) {
            let dragItem = self.components[self.dragIndex];
            self.components[self.tabIndex].components.splice(inTabIndex, 0, dragItem);
            self.components[self.tabIndex].selected = inTabIndex;
            self.components.splice(self.dragIndex, 1);
            self.selected = null;
          } else {
            if ((self.parNodeIndex == self.tabIndex && self.dragIndex != inTabIndex && self.dragIndex != inTabIndex - 1) || self.parNodeIndex != self.tabIndex) {
              let dragItem = self.components[self.parNodeIndex].components[self.dragIndex];
              self.components[self.parNodeIndex].components.splice(self.dragIndex, 1)
              if (inTabIndex > 0) {
                self.components[self.tabIndex].components.splice(inTabIndex, 0, dragItem);
              } else if (inTabIndex == 0) {
                self.components[self.tabIndex].components.unshift(dragItem);
              }
              /*
               self.components[self.parNodeIndex].components.splice(self.dragIndex, 1);
               self.components[self.tabIndex].components.splice(inTabIndex, 0, dragItem);*/
              self.selected = null;
              self.components[self.tabIndex].selected = inTabIndex;
            } else {
              let dom = self.queryDomByIndex(self.queryDomByIndex(document, self.parNodeIndex), self.dragIndex);
              dom.classList.remove('draging');
            }
          }
          self.dragIndex = null;
          self.isDrag = false;
        } else {
          //添加新组件
          let idx = 0;
          for (let i = 0; i < self.components[self.tabIndex].components.length; i++) {
            let item = self.components[self.tabIndex].components[i];
            if (item.name == component.componentView.name) {
              idx++;
            }
          }
          component.componentView.idx = componentsLength;
          if (idx > 0) {
            component.componentView.defaultLable = component.componentView.defaultLable + "（" + idx + "）";
          }
          if (self.components[self.tabIndex].InTableCanvas > 0) {
            self.components[self.tabIndex].components.splice(self.components[self.tabIndex].InTableCanvas, 0, component.componentView);
          } else if (self.components[self.tabIndex].InTableCanvas == 0) {
            self.components[self.tabIndex].components.unshift(component.componentView);
          }
          this.eventService.changeTab.next(true);
          this.eventService.selectComponent.next(component.componentView);
        }
        for (let i = 0, l = self.components.length; i < l; i++) {
          self.components[i].InTableCanvas = null;
        }
      }
      if (self.components.length <= 0) {
        self.isempty = true
      } else {
        self.isempty = false
      }
      let doms = document.querySelectorAll('.draging');
      if(doms.length>0){
        doms.item(0).classList.remove('draging');
      }
      // let dom = self.queryDomByIndex(document, self.dragIndex);
      // dom.classList.remove('draging');
    })
    this.eventService.changeComponent.subscribe(obj => {
      for (let i = 0; i < self.components.length; i++) {
        let item = self.components[i];
        if (item.idx == obj.idx) {
          self.components.splice(i, 1, obj)
        } else if (item.componentName == 'tablefield') {
          for (let m = 0, n = item.components.length; m < n; m++) {
            if (obj.idx == item.components[m].idx) {
              self.components[i].components.splice(m, 1, obj)
            }
          }
        }
      }
    })
    this.eventService.changeInfo.subscribe( obj => {
      self.title = obj.title;
      self.description = obj.description;
      self.icon = obj.icon;
    })
    this.eventService.save.subscribe( _=> {
      let obj = {
        title: self.title,
        description: self.description,
        icon: self.icon,
        components: self.components
      }
      console.log(obj)
    })
  }

  ngAfterViewInit(){
    console.log('ngAfterViewInit')
    let dom :any= document.querySelector('.wf-formcanvas-inner')
    var actualLeft = dom.offsetLeft;
    let current = dom.offsetParent;
    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    var actualTop = dom.offsetTop;
    current = dom.offsetParent;
    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    this.left = actualLeft
    this.top = actualTop
    this.width = dom.offsetWidth
    this.height = dom.offsetHeight
  }
  ngAfterViewChecked(){
    this.domArr = []
    let domArr:any = document.querySelectorAll('.wf-formcanvas-body>div>div>.wf-component')
    for (let i = 0, l = domArr.length; i < l; i++) {
      let obj = domArr[i];
      if (obj.className.indexOf('wf-component-tablefield') >= 0) {
        let middleDomArr = [];
        let objTop = obj.offsetTop;
        let middleDom = obj.querySelectorAll('.wf-component')
        for (let m = 0, n = middleDom.length; m < n; m++) {
          let item = middleDom[m];
          middleDomArr.push({
            height: item.offsetHeight,
            middle_top: (objTop + 18 + item.offsetTop + item.offsetHeight / 2) >> 0,
            middle_lower: (objTop + 18 + item.offsetTop + item.offsetHeight / 2) >> 0,
            top: item.offsetTop + objTop
          })
        }
        this.domArr.push({
          height: obj.offsetHeight,
          middle_top: (obj.offsetTop + 18) >> 0,
          middle: (obj.offsetTop + obj.offsetHeight / 2) >> 0,
          middle_lower: (obj.offsetTop + obj.offsetHeight - 23) >> 0,
          top: objTop,
          domArr: middleDomArr
        })
      } else {
        this.domArr.push({
          height: obj.offsetHeight,
          middle: (obj.offsetTop + obj.offsetHeight / 2) >> 0,
          middle_top: (obj.offsetTop + obj.offsetHeight / 2) >> 0,
          middle_lower: (obj.offsetTop + obj.offsetHeight / 2) >> 0,
          top: obj.offsetTop
        })
      }

    }
  }
  hover(e){
    e.stopPropagation();
    e.preventDefault()
    e.currentTarget.classList.add('hover')
  }
  mouseOut(e){
    e.stopPropagation();
    e.preventDefault()
      e.currentTarget.classList.remove('hover')
  }
  close(e){
    e.preventDefault();
    e.stopPropagation();
    let dom = e.currentTarget.parentNode;
    let parNode = dom.parentNode.parentNode.parentNode.parentNode;
    let index = dom.getAttribute('data-index');
    if(parNode.className.indexOf('wf-componentview-area') >= 0) {
      let parNodeIndex = parNode.parentNode.parentNode.getAttribute('data-index');
      this.components[parNodeIndex].components.splice(index, 1)
      if (parNode.className.indexOf('active') > 0) {
        this.eventService.changeTab.next(false);
        this.selected = null;
        this.components[parNodeIndex].selected = null
      }
    } else {
      this.components.splice(index, 1)
        if(dom.className.indexOf('active') > 0) {
        this.eventService.changeTab.next(false);
        this.selected = null;
      }
        if(this.components.length <= 0) {
        this.isempty = true
      }
    }
  }
  mouseDown(e){
    e.stopPropagation();
    let dom = e.currentTarget;
    let index = dom.getAttribute('data-index');
    let parNode = dom.parentNode.parentNode.parentNode.parentNode;
    let obj;
    if(parNode.className.indexOf('wf-componentview-area') >= 0) {
      let parNodeIndex = parNode.parentNode.parentNode.getAttribute('data-index');

      obj = this.components[parNodeIndex].components[index];
      if (this.selected == index && this.parNodeIndex != parNodeIndex || this.selected !== index) {
        this.parNodeIndex = parNodeIndex;
        this.selected = null;
        this.components[parNodeIndex].selected = index;
        this.eventService.selectComponent.next(obj);
        this.eventService.changeTab.next(true);
      }
    } else {
      this.parNodeIndex = null;
      for(let i = 0, l = this.components.length; i <l; i++) {
        this.components[i].selected = null;
      }
        obj = this.components[index];
      if(this.selected !== index) {
        this.selected = index
        this.eventService.selectComponent.next(obj);
        this.eventService.changeTab.next(true);
      }
    }
  }
  movestart(e){
    e.preventDefault()
      e.stopPropagation()
      let obj :any = {}
      let dom = e.currentTarget
      dom.classList.add('draging')
      let index = dom.getAttribute('data-index');
    let actualLeft = dom.offsetLeft;
    let current = dom.offsetParent;
    while(current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
      let actualTop = dom.offsetTop;
    while(current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
      obj.clientX = e.clientX;
    obj.clientY = e.clientY;
    obj.isstart = true;
    let parNode = dom.parentNode.parentNode.parentNode.parentNode;
    if(parNode.className.indexOf('wf-componentview-area') >= 0) {
      let parNodeIndex = parNode.parentNode.parentNode.getAttribute('data-index');
      obj.componentView = this.components[parNodeIndex].components[index];
      obj.componentName = this.components[parNodeIndex].components[index].componentName;
      obj.componentText = this.components[parNodeIndex].components[index].name;
    } else {
      obj.componentView = this.components[index];
      obj.componentName = this.components[index].componentName;
      obj.componentText = this.components[index].name;
    }
      this.isDrag = true;
    this.dragIndex = index;
    console.log(obj)
    this.eventService.movestart.next(obj);
  }
  queryDomByIndex(parentNode, index){
    let dom = parentNode.querySelectorAll('.wf-component');
    for(let i = 0, l = dom.length; i <l; i++) {
      let obj = dom[i];
      if (obj.getAttribute('data-index') == index) {
        return obj
      }
    }
  }
  getcomponents(){
    let count = 0;
    for(let i = 0, l = this.domArr.length; i <l; i++) {
      count++;
      if (Object.prototype.toString.call(this.domArr[i].domArr).slice(8, -1) === "Array") {
        for (let m = 0, n = this.domArr[i].domArr.length; m < n; m++) {
          count++
        }
      }
    }
      return count
  }
}

