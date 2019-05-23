import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordWordListComponent } from './word-list/word-list.component';

const routes: Routes = [

  { path: 'word-list/:type', component: WordWordListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordRoutingModule { }
