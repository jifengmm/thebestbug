import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { EmailConfigRoutingModule } from './email-config-routing.module';
import { EmailConfigEmailConfigListComponent } from './email-config-list/email-config-list.component';
import { EmailConfigEmailConfigEditComponent } from './email-config-edit/email-config-edit.component';

const COMPONENTS = [
  EmailConfigEmailConfigListComponent];
const COMPONENTS_NOROUNT = [
  EmailConfigEmailConfigEditComponent];

@NgModule({
  imports: [
    SharedModule,
    EmailConfigRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class EmailConfigModule { }
