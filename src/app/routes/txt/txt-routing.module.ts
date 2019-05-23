import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TxtTxtListComponent } from './txt-list/txt-list.component';

const routes: Routes = [

  { path: 'txt-list/:type', component: TxtTxtListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TxtRoutingModule { }
