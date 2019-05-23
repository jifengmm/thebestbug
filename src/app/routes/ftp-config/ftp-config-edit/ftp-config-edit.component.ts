import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-ftp-config-ftp-config-edit',
  templateUrl: './ftp-config-edit.component.html',
})
export class FtpConfigFtpConfigEditComponent implements OnInit {
  record: any = {};
  i: any;
  title: string;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '名称' },
      account: { type: 'string', title: '账户' },
      password: { type: 'string', title: '密码' },
      address: { type: 'string', title: 'FTP地址' },
      port: { type: 'number', title: '端口' },
    },
    required: ['name', 'account', 'password', 'address', 'port'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $name: {
      widget: 'string',
    },
    $account: {
      widget: 'string',
    },
    $password: {
      widget: 'string',
    },
    $address: {
      widget: 'string',
    },
    $port: {
      widget: 'number',
      validator: (value: any) => {
        return value > 0
          ? []
          : [{ keyword: 'required', message: '必须是正整数' }];
      },
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.http.get(`/ftpconfig/${this.record.id}`).subscribe(res => {
        this.i = res;
        this.title = `编辑FTP(${this.i.name})`;
      });
    } else {
      this.title = `新增FTP`;
      this.i = {
        name: '',
        account: '',
        password: '',
        address: '',
        port: '',
      };
    }
  }

  save(value: any) {
    if (this.record.id > 0) {
      this.http.put(`/ftpconfig/${this.record.id}`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`/ftpconfig`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
