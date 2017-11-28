import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {GoogleStyledMapModule} from "../../../app-core/google-styled-map/google-styled-map.module";
import {ProducerProfileAddressMapComponent} from "./producer-profile-address-map.component";
import {AgmCoreModule} from "@agm/core";

@NgModule({
  imports: [
    SharedModule,
    AgmCoreModule,
    GoogleStyledMapModule,
  ],
  declarations: [
    ProducerProfileAddressMapComponent,
  ],
  exports: [
    ProducerProfileAddressMapComponent,
  ],
  providers: [
  ],

})
export class ProducerProfileAddressMapModule {}
