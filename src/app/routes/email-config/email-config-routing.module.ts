import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailConfigEmailConfigListComponent } from './email-config-list/email-config-list.component';

const routes: Routes = [

  { path: 'email-config-list', component: EmailConfigEmailConfigListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailConfigRoutingModule { }
