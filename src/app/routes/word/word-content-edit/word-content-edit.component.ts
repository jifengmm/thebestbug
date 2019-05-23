import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';

@Component({
  selector: 'app-word-word-content-edit',
  templateUrl: './word-content-edit.component.html',
})
export class WordWordContentEditComponent implements OnInit {

  webObj: any ;
  record: any = {};

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.webObj = document.getElementById('WebOffice1');
      this.webObj.ShowToolBar = false;
      this.http.get(`/word/${this.record.id}`).subscribe(res => {
        const obj = res as any;
        this.webObj.LoadOriginalFile(obj.remotePath, 'docx');
      });
    }, 100);
  }

  close() {
    this.webObj.Close();
    this.modal.destroy();
  }

  save() {
    this.webObj.Save();
    this.webObj.HttpInit();
    this.webObj.HttpAddPostString('id', this.record.id);
    this.webObj.HttpAddPostCurrFile('file', '');
    const returnValue = this.webObj.HttpPost(`${environment.UPLOAD_URL}/word`);
    if (returnValue == 'succeed'){
      this.msgSrv.success('操作成功');
      this.close();
    } else {
      this.msgSrv.error('操作失败');
    }
  }
}
