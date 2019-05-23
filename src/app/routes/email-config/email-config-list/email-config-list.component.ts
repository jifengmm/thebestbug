import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { EmailConfigEmailConfigEditComponent } from '../email-config-edit/email-config-edit.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-config-email-config-list',
  templateUrl: './email-config-list.component.html',
})
export class EmailConfigEmailConfigListComponent implements OnInit {
  url = '/emailconfig/get_by_page';
  type: number;
  searchSchema: SFSchema = {
    properties: {
      keyword: {
        type: 'string',
        title: '关键字',
      },
    },
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '名称', index: 'name' },
    { title: '邮箱地址', index: 'address' },
    { title: '添加日期', type: 'date', index: 'addTime' },
    {
      title: '操作',
      buttons: [
        {
          text: '编辑',
          click: (item: any) => this.addEdit(item.id),
        },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => this.delete(item.id),
        },
      ],
    },
  ];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    public router: Router,
    public activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
  }

  addEdit(id = 0) {
    this.modal
      .createStatic(EmailConfigEmailConfigEditComponent, {
        record: { id,
          type: this.type },
      })
      .subscribe(() => this.st.reload());
  }

  delete(id) {
    this.http.delete(`/word/${id}`).subscribe(() => {
      this.msgSrv.success('操作成功!');
      this.st.reload();
    });
  }

}
