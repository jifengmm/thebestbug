import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { UserUserEditComponent } from '../user-edit/user-edit.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-user-list',
  templateUrl: './user-list.component.html',
})
export class UserUserListComponent implements OnInit {
  url = `/account/get_by_page`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '登陆名', index: 'loginName' },
    { title: '员工姓名', index: 'employeeName' },
    { title: '添加日期', type: 'date', index: 'addTime' },
    {
      title: '管理',
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
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private msgSrv: NzMessageService) { }

  ngOnInit() { }

  addEdit(id = 0) {
    this.modal
      .createStatic(UserUserEditComponent, {
        record: { id },
      })
      .subscribe(() => this.st.reload());
  }

  delete(id) {
    this.http.delete(`/propertyinfo/${id}`).subscribe(() => {
      this.msgSrv.success('操作成功!');
      this.st.reload();
    });
  }
}
