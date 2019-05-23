import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { WordWordEditComponent } from '../word-edit/word-edit.component';
import { WordWordContentEditComponent } from '../word-content-edit/word-content-edit.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-word-word-list',
  templateUrl: './word-list.component.html',
})
export class WordWordListComponent implements OnInit {
  url = '';
  type: number;
  searchSchema: SFSchema = {
    properties: {
      start: {
        type: 'string',
        ui: { widget: 'date', end: 'end' },
        title: '日期',
      },
      end: {
        type: 'string',
      },
      keyword: {
        type: 'string',
        title: '关键字',
      },
    },
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '文档名', index: 'name' },
    { title: '日期', type: 'date', index: 'date' },
    {
      title: '上传状态', index: 'statusDesc' },
    { title: '添加日期', type: 'date', index: 'addTime' },
    {
      title: '操作',
      buttons: [
        {
          text: '编辑',
          click: (item: any) => this.addEdit(item.id),
        },
        {
          text: '编辑文档',
          click: (item: any) => this.editContent(item.id),
        },
        {
          text: '上传',
          click: (item: any) => this.upload(item.id),
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
    this.activeRoute.params.subscribe((params: Params) => {
      this.type = params.type ;
      this.url = `/word/get_by_page?type=${this.type}`;
    });
  }

  addEdit(id = 0) {
    this.modal
      .createStatic(WordWordEditComponent, {
        record: { id,
          type: this.type },
      })
      .subscribe(() => this.st.reload());
  }

  editContent(id) {
    this.modal
      .createStatic(WordWordContentEditComponent, {
        record: { id,
          type: this.type },
      }, { size : 'xl'})
      .subscribe(() => this.st.reload());
  }

  upload(id) {
    this.http.get(`/word/upload/${id}`).subscribe(() => {
      this.msgSrv.success('操作成功!');
      this.st.reload();
    });
  }

  delete(id) {
    this.http.delete(`/word/${id}`).subscribe(() => {
      this.msgSrv.success('操作成功!');
      this.st.reload();
    });
  }
}
