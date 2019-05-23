import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { SysSysEditComponent } from '../sys-edit/sys-edit.component';

@Component({
  selector: 'app-sys-sys-list',
  templateUrl: './sys-list.component.html',
})
export class SysSysListComponent implements OnInit {
  url = `/achievement/get_by_page`;
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
    { title: '用户ID', index: 'userId' },
    { title: '业绩数目', index: 'achievementNum' },
    { title: '业绩类型', index: 'achievementType' },
    { title: '备注', index: 'remark' },
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
      .createStatic(SysSysEditComponent, {
        record: { id },
      })
      .subscribe(() => this.st.reload());
  }

  delete(id) {
    this.http.delete(`/achievement/${id}`).subscribe(() => {
      this.msgSrv.success('操作成功!');
      this.st.reload();
    });
  }

}
