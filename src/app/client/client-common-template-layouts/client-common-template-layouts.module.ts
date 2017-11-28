import { NgModule }       from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {ClientHeaderWrapperComponent} from "./client-common-header-wrapper/client-header-wrapper.component";
import {ClientProfileAvatarComponent} from "./client-common-profile-avatar/client-profile-avatar.component";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ClientHeaderWrapperComponent,
    ClientProfileAvatarComponent,
  ],
  exports: [
    ClientHeaderWrapperComponent,
    ClientProfileAvatarComponent,
  ],
  providers: [
  ],
})
export class ClientCommonTemplateLayoutsModule {}
