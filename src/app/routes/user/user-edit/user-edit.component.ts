import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-user-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserUserEditComponent implements OnInit {
  record: any = {};
  i: any;
  title: string;
  schema: SFSchema = {
    properties: {
      loginName: { type: 'string', title: '登录名', maxLength: 50 },
      employeeName: { type: 'string', title: '员工姓名' , maxLength: 50 },
    },
    required: ['employeeName', 'loginName'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $employeeName: {
      widget: 'string',
      placeholder: '请输入员工姓名，最多50个字符',
    },
    $loginName: {
      widget: 'string',
      placeholder: '请输入登录名，最多50个字符',
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.http.get(`/account/${this.record.id}`).subscribe(res => {
        this.i = res;
        this.title = `编辑用户(${this.i.employeeName})`;
      });
    } else {
      this.title = '新增用户';
      this.schema.properties.userPass = { type: 'string', title: '密码' , maxLength: 50 };
      this.ui.$userPass = {
        widget: 'string',
        placeholder: '请输入密码,不输入则默认123456',
      };
      this.i = {
        employeeName: null,
        loginName: null,
        userPass: null
      };
    }
  }

  save(value: any) {
    if (this.record.id > 0) {
      this.http
        .put(`/account/${this.record.id}`, value)
        .subscribe(res => {
          this.msgSrv.success('保存成功');
          this.modal.close(true);
        });
    } else {
      this.http.post(`/account`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
