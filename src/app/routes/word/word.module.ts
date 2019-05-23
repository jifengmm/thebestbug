import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { WordRoutingModule } from './word-routing.module';
import { WordWordListComponent } from './word-list/word-list.component';
import { WordWordEditComponent } from './word-edit/word-edit.component';
import { WordWordTextEditComponent } from './word-text-edit/word-text-edit.component';
import { WordWordContentEditComponent } from './word-content-edit/word-content-edit.component';

const COMPONENTS = [
  WordWordListComponent];
const COMPONENTS_NOROUNT = [
  WordWordEditComponent,
  WordWordTextEditComponent,
  WordWordContentEditComponent];

@NgModule({
  imports: [
    SharedModule,
    WordRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class WordModule { }
