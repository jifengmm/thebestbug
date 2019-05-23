import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-email-config-email-config-edit',
  templateUrl: './email-config-edit.component.html',
})
export class EmailConfigEmailConfigEditComponent implements OnInit {
  record: any = {};
  i: any;
  title: string;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '名称' },
      address: { type: 'string', title: '邮箱地址' },
    },
    required: ['name', 'address'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $name: {
      widget: 'string',
    },
    $address: {
      widget: 'string',
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.http.get(`/emailconfig/${this.record.id}`).subscribe(res => {
        this.i = res;
        this.title = `编辑FTP(${this.i.name})`;
      });
    } else {
      this.title = `新增FTP`;
      this.i = {
        name: '',
        address: '',
      };
    }
  }

  save(value: any) {
    if (this.record.id > 0) {
      this.http.put(`/emailconfig/${this.record.id}`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`/emailconfig`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
