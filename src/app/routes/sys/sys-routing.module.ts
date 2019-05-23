import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysSysListComponent } from './sys-list/sys-list.component';

const routes: Routes = [

  { path: 'sys-list', component: SysSysListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
