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
      name: '单行输入框',
      defaultLable: '单行输入框',
      defaultProps: '请输入',
      defaultImportant: false,
      defaultPrint: false,
      componentName: 'textfield',
      supportSetting: ['label', 'placeholder', 'required', 'important', 'print']
    },
    {
      name: '多行输入框',
      defaultLable: '多行输入框',
      defaultProps: '请输入',
      defaultImportant: false,
      defaultPrint: false,
      componentName: 'textareafield',
      supportSetting: ['label', 'placeholder', 'required', 'important', 'print']
    },
    {
      name: '数字输入框',
      defaultLable: '数字输入框',
      defaultProps: '请输入',
      defaultImportant: false,
      defaultPrint: false,
      componentName: 'numberfield',
      supportSetting: ['label', 'placeholder', 'required', 'important', 'print', 'uint']
    },
    {
      name: '单选框',
      defaultLable: '单选框',
      defaultProps: '请选择',
      defaultImportant: false,
      defaultSync: false,
      defaultPrint: false,
      defaultOptions: [
        { idx: 1, text: '选项1' },
        { idx: 2, 'text': '选项2' },
        { idx: 3, text: '选项3' }
      ],
      componentName: 'ddselectfield',
      supportSetting: ['label', 'placeholder', 'options', 'sync', 'required', 'important', 'print']
    },
    {
      name: '多选框',
      defaultLable: '多选框',
      defaultProps: '请选择',
      defaultImportant: false,
      defaultPrint: false,
      defaultOptions: [
        { idx: 1, text: '选项1' },
        { idx: 2, 'text': '选项2' },
        { idx: 3, text: '选项3' }
      ],
      componentName: 'ddmultiselectfield',
      supportSetting: ['label', 'placeholder', 'options', 'required', 'important', 'print']
    },
    {
      name: '日期',
      defaultLable: '日期',
      defaultProps: '请选择',
      defaultImportant: false,
      defaultPrint: false,
      defaultFormat: 'yyyy-MM-dd',
      componentName: 'dddatefield',
      supportSetting: ['label', 'placeholder', 'dateformat', 'required', 'important', 'print']
    },
    {
      name: '日期区间',
      defaultLable: '开始时间',
      defaultLable2: '结束时间',
      defaultProps: '请选择',
      defaultProps2: '请选择',
      defaultImportant: false,
      defaultPrint: false,
      defaultAutorekonTime: false,
      defaultFormat: 'yyyy-MM-dd',
      defaultSubtitle: '时长',
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
      name: '图片',
      defaultLable: '图片',
      defaultImportant: false,
      defaultPrint: false,
      componentName: 'ddphotofield',
      supportSetting: ['label', 'required', 'important', 'print']
    },
    {
      name: '明细',
      defaultLable: '明细',
      defaultAction: '增加明细',
      components: [],
      selected: null,
      defaultPrint: false,
      InTableCanvas: null,
      componentName: 'tablefield',
      supportSetting: ['label', 'action', 'required']
    },
    {
      name: '说明文字',
      defaultLable: '说明文字',
      defaultImportant: false,
      defaultProps: '请输入说明文字',
      defaultShow: false,
      defaultPrint: false,
      defaultHref: '',
      componentName: 'textnote',
      supportSetting: ['textnote', 'required', 'href', 'print', 'show', 'important']
    },
    {
      name: '金额',
      defaultLable: '金额（元）',
      defaultProps: '请输入',
      defaultImportant: false,
      defaultTranslate: false,
      defaultPrint: false,
      componentName: 'moneyfield',
      supportSetting: ['label', 'placeholder', 'translate', 'required', 'important', 'print']
    },
    {
      name: '附件',
      defaultLable: '附件',
      defaultImportant: false,
      defaultPrint: false,
      componentName: 'ddattachment',
      supportSetting: ['label', 'required', 'important', 'print']
    },
    {
      name: '外部联系人',
      defaultLable: '外部联系人',
      defaultProps: '请选择',
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
