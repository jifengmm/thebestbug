import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FtpConfigFtpConfigListComponent } from './ftp-config-list/ftp-config-list.component';

const routes: Routes = [

  { path: 'ftp-config-list', component: FtpConfigFtpConfigListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FtpConfigRoutingModule { }
