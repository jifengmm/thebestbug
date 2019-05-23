import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysRoutingModule } from './sys-routing.module';
import { SysSysListComponent } from './sys-list/sys-list.component';
import { SysSysEditComponent } from './sys-edit/sys-edit.component';

const COMPONENTS = [
  SysSysListComponent];
const COMPONENTS_NOROUNT = [
  SysSysEditComponent];

@NgModule({
  imports: [
    SharedModule,
    SysRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SysModule { }
