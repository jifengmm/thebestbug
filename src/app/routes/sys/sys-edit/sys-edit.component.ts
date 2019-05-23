import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-sys-sys-edit',
  templateUrl: './sys-edit.component.html',
})
export class SysSysEditComponent implements OnInit {
  record: any = {};
  i: any;
  title: string;
  schema: SFSchema = {
    properties: {
      userId: { type: 'number', title: '用户ID', minimum: 1 },
      remark: { type: 'string', title: '备注', maxLength: 255 },
    },
    required: ['userId', 'remark'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $userId: {
      widget: 'number',
      placeholder: '请输入用户ID',
    },
    $remark: {
      widget: 'string',
      placeholder: '请输入备注，最多255个字符',
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) { }

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.http.get(`/achievement/${this.record.id}`).subscribe(res => {
        this.i = res;
        this.title = `编辑业绩(${this.i.userId})`;
      });
    } else {
      this.title = '新增业绩';
      // this.schema.properties.userPass = { type: 'string', title: '密码' , maxLength: 50 };
      // this.ui.$userPass = {
      //   widget: 'string',
      //   placeholder: '请输入密码,不输入则默认123456',
      // };
      this.i = {
        userId: 1,
        remark: null,
      };
    }
  }

  save(value: any) {
    if (this.record.id > 0) {
      this.http
        .put(`/achievement/${this.record.id}`, value)
        .subscribe(res => {
          this.msgSrv.success('保存成功');
          this.modal.close(true);
        });
    } else {
      this.http.post(`/achievement`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
