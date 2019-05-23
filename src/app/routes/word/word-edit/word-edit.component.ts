import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-word-word-edit',
  templateUrl: './word-edit.component.html',
  providers: [DatePipe]
})
export class WordWordEditComponent implements OnInit {
  record: any = {};
  i: any;
  title: string;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '文档名' },
      date: { type: 'string', title: '日期' },
    },
    required: ['name', 'date'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $name: {
      widget: 'string',
    },
    $date: {
      widget: 'date',
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    public datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    const preTitle = this.getTitle(this.record.type);
    if (this.record.id > 0) {
      this.http.get(`/word/${this.record.id}`).subscribe(res => {
        this.i = res;
        this.title = `编辑${preTitle}(${this.i.name})`;
      });
    } else {
      this.title = `新增${preTitle}`;
      this.i = {
        type: this.record.type,
        name: this.getName(this.record.type),
        date: new Date()
      };
    }
  }

  getTitle(type) {
    switch (type) {
      case '1':
        return '解说词';
      case '2':
        return '专项气象服务';
      case '3':
        return '周报';
      case '4':
        return '旬报';
      case '5':
        return '月报';
    }
  }

  getName(type) {
    const date = this.datePipe.transform(new Date(), 'MMdd');
    switch (type) {
      case '1':
        return `解说词${date}`;
      case '2':
        return `环卫精细化预报${date}`;
      case '3':
        return `周报${date}`;
      case '4':
        return `旬报${date}`;
      case '5':
        return `月报${date}`;
    }
  }

  save(value: any) {
    if (this.record.id > 0) {
      this.http.put(`/word/${this.record.id}`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`/word`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
