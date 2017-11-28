import { NgModule }       from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {ProducerHeaderWrapperComponent} from "./producer-common-header-wrapper/producer-header-wrapper.component";
import {ProducerProfileAvatarComponent} from "./producer-common-profile-avatar/producer-profile-avatar.component";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ProducerHeaderWrapperComponent,
    ProducerProfileAvatarComponent,
  ],
  exports: [
    ProducerHeaderWrapperComponent,
    ProducerProfileAvatarComponent,
  ],
  providers: [
  ],
})
export class ProducerCommonTemplateLayoutsModule {}
