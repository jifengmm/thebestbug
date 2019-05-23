import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserUserListComponent } from './user-list/user-list.component';
import { UserUserEditComponent } from './user-edit/user-edit.component';

const COMPONENTS = [
  UserUserListComponent];
const COMPONENTS_NOROUNT = [
  UserUserEditComponent];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UserModule { }
