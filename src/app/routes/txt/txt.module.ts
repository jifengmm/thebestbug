import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { TxtRoutingModule } from './txt-routing.module';
import { TxtTxtListComponent } from './txt-list/txt-list.component';

const COMPONENTS = [
  TxtTxtListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    TxtRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TxtModule { }
