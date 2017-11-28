import { NgModule }       from '@angular/core';


import {SharedModule} from "../shared/shared.module";
import {CommonTemplateLayoutModule} from "../app-core/common-template-layout/common-template-layout.module";
import {ProducerComponent} from "./producer.component";
import {ProducerCommonTemplateLayoutsModule} from "./producer-common-template-layouts/producer-common-template-layouts.module";
import {ProducerRoutingModule} from "./producer-routing.module";
import {ProducerProfileModule} from "./producer-profile/producer-profile.module";
import {ProducerService} from "./producer-service.service";
import {ProducerSpiritsModule} from "./producer-spirits/producer-spirits.module";
import {ProducerProfileAddressMapModule} from "./producer-profile/producer-profile-address-map/producer-profile-address-map.module";


@NgModule({
  imports: [
    SharedModule,
    CommonTemplateLayoutModule,
    ProducerRoutingModule,
    ProducerCommonTemplateLayoutsModule,
    ProducerProfileModule,
    ProducerSpiritsModule,
    ProducerProfileAddressMapModule
  ],
  declarations: [
    ProducerComponent,
  ],
  exports: [
  ],
  providers: [
    ProducerService,
  ],
})

export class ProducerModule {}
