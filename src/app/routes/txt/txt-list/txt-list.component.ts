import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-txt-txt-list',
  templateUrl: './txt-list.component.html',
})
export class TxtTxtListComponent implements OnInit {

  type: number;
  panels = [
  ];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    public router: Router,
    public activeRoute: ActivatedRoute, ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.type = params.type ;
      this.http.get(`/txt/get_by_page?type=${this.type}&pi=1&ps=99999`).subscribe(res => {
        const obj = res as any;
        if (obj.list.length > 0) {
          const list = [];
          obj.list.forEach(item => {
            list.push({
              active: true,
              disabled: false,
              name: item.name,
              model: item,
            });
          });
          this.panels = list;
        }
      });
    });
   }

   tempSave(item) {
    this.http.put(`/txt/${item.id}`, item).subscribe(res => {
      this.msgSrv.success('保存成功');
    });
   }
}
