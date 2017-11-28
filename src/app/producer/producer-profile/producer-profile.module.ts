import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {ProducerCommonTemplateLayoutsModule} from "../producer-common-template-layouts/producer-common-template-layouts.module";
import {ProducerProfileComponent} from "./producer-profile.component";
import {ProducerProfileAddressMapModule} from "./producer-profile-address-map/producer-profile-address-map.module";
import {ProducerSpiritsModule} from "../producer-spirits/producer-spirits.module";

@NgModule({
  imports: [
    SharedModule,
    ProducerCommonTemplateLayoutsModule,
    ProducerProfileAddressMapModule,
    ProducerSpiritsModule,
  ],
  declarations: [
    ProducerProfileComponent,
  ],
  providers: [
  ],
})
export class ProducerProfileModule {}
