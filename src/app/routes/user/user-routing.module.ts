import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserUserListComponent } from './user-list/user-list.component';

const routes: Routes = [

  { path: 'user-list', component: UserUserListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
