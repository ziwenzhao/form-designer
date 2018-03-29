import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/event.service';

@Component({
  selector: 'mainleft',
  templateUrl: './main-left.component.html',
  styleUrls: ['./main-left.component.css']
})
export class MainLeftComponent implements OnInit {
  private components = [
    {
      name: 'Text Field',
      defaultLable: 'Text Field',
      defaultProps: '',
      defaultImportant: false,
      defaultPrint: false,
      componentName: 'textfield',
      supportSetting: ['label', 'placeholder', 'required', 'important', 'print']
    },
    {
      name: 'Text Area',
      defaultLable: 'Text Area',
      defaultProps: '',
      defaultImportant: false,
      defaultPrint: false,
      componentName: 'textareafield',
      supportSetting: ['label', 'placeholder', 'required', 'important', 'print']
    },
    {
      name: 'Number',
      defaultLable: 'Number',
      defaultProps: '',
      defaultImportant: false,
      defaultPrint: false,
      componentName: 'numberfield',
      supportSetting: ['label', 'placeholder', 'required', 'important', 'print', 'uint']
    },
    {
      name: 'Select',
      defaultLable: 'Select',
      defaultProps: 'Please select',
      defaultImportant: false,
      defaultSync: false,
      defaultPrint: false,
      defaultOptions: [
        { idx: 1, text: 'Option1' },
        { idx: 2, 'text': 'Option2' },
        { idx: 3, text: 'Option3' }
      ],
      componentName: 'ddselectfield',
      supportSetting: ['label', 'placeholder', 'options', 'sync', 'required', 'important', 'print']
    },
    {
      name: 'Multiple Select',
      defaultLable: 'Multiple Select',
      defaultProps: 'Please select',
      defaultImportant: false,
      defaultPrint: false,
      defaultOptions: [
        { idx: 1, text: 'Option1' },
        { idx: 2, 'text': 'Option2' },
        { idx: 3, text: 'Option3' }
      ],
      componentName: 'ddmultiselectfield',
      supportSetting: ['label', 'placeholder', 'options', 'required', 'important', 'print']
    },
    {
      name: 'Date',
      defaultLable: 'Date',
      defaultProps: 'Please select a date',
      defaultImportant: false,
      defaultPrint: false,
      defaultFormat: 'yyyy-MM-dd',
      componentName: 'dddatefield',
      supportSetting: ['label', 'placeholder', 'dateformat', 'required', 'important', 'print']
    },
    {
      name: 'Date Range',
      defaultLable: 'Start Date',
      defaultLable2: 'End Date',
      defaultProps: 'Please select a date',
      defaultProps2: 'Please select a date',
      defaultImportant: false,
      defaultPrint: false,
      defaultAutorekonTime: false,
      defaultFormat: 'yyyy-MM-dd',
      defaultSubtitle: 'Duration',
      componentName: 'dddaterangefield',
      supportSetting: [
        'label',
        'label2',
        'placeholder',
        'placeholder2',
        'dateformat',
        'required',
        'important',
        'autorekonTime',
        'subtitle',
        'print']
    },
    {
      name: 'Photo',
      defaultLable: 'Photo',
      defaultImportant: false,
      defaultPrint: false,
      componentName: 'ddphotofield',
      supportSetting: ['label', 'required', 'important', 'print']
    },
    {
      name: 'Details',
      defaultLable: 'Details',
      defaultAction: 'Add Details',
      components: [],
      selected: null,
      defaultPrint: false,
      InTableCanvas: null,
      componentName: 'tablefield',
      supportSetting: ['label', 'action', 'required']
    },
    {
      name: 'Description',
      defaultLable: 'Description',
      defaultImportant: false,
      defaultProps: '',
      defaultShow: false,
      defaultPrint: false,
      defaultHref: '',
      componentName: 'textnote',
      supportSetting: ['textnote', 'required', 'href', 'print', 'show', 'important']
    },
    {
      name: 'Currency',
      defaultLable: 'Currency',
      defaultProps: '',
      defaultImportant: false,
      defaultTranslate: false,
      defaultPrint: false,
      componentName: 'moneyfield',
      supportSetting: ['label', 'placeholder', 'translate', 'required', 'important', 'print']
    },
    {
      name: 'Attachment',
      defaultLable: 'Attachment',
      defaultImportant: false,
      defaultPrint: false,
      componentName: 'ddattachment',
      supportSetting: ['label', 'required', 'important', 'print']
    },
    {
      name: 'Contacts',
      defaultLable: 'Contacts',
      defaultProps: 'Please select contacts',
      defaultPrint: false,
      defaultImportant: false,
      componentName: 'externalcontactfield',
      supportSetting: ['label', 'placeholder', 'required', 'important', 'print']
    }
  ]

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  start(e){
    let obj :any = {};
    let dom = e.currentTarget
    let index = dom.getAttribute('data-index')
    let actualLeft = dom.offsetLeft;
    let current = dom.offsetParent;
    let actualTop = dom.offsetTop;
    while (current !== null) {
      actualLeft += current.offsetLeft;
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    obj.componentName = dom.getAttribute("data-type")
    obj.componentText = dom.querySelector('label').innerText
    obj.clientX = e.clientX
    obj.clientY = e.clientY
    obj.isstart = true
    obj.componentView = this.components[index]
    console.log(obj)
    this.eventService.movestart.next(obj);
  }

}
