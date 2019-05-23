import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FtpConfigRoutingModule } from './ftp-config-routing.module';
import { FtpConfigFtpConfigListComponent } from './ftp-config-list/ftp-config-list.component';
import { FtpConfigFtpConfigEditComponent } from './ftp-config-edit/ftp-config-edit.component';

const COMPONENTS = [
  FtpConfigFtpConfigListComponent];
const COMPONENTS_NOROUNT = [
  FtpConfigFtpConfigEditComponent];

@NgModule({
  imports: [
    SharedModule,
    FtpConfigRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class FtpConfigModule { }
