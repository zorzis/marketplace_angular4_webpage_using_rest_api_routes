import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {ClientCommonTemplateLayoutsModule} from "../../client-common-template-layouts/client-common-template-layouts.module";
import {ClientNewAddressComponent} from "./client-new-address.component";
import {ClientCreateNewAddressService} from "./client-new-address.service";

import { AgmCoreModule } from '@agm/core';

import {GoogleMapsInputNewClientAddressComponent} from "./google-maps-input-new-client-address/google-maps-input-new-client-address.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmGoogleMapsInputNewClientAddressComponent} from "./user-custom-inputs-client-new-address/confirm-google-maps-input-new-client-addres.component";
import {AddressSharedService} from "./google-maps-location-shared-service.service";
import {DraggableMarkerNewLocationService} from "./user-custom-inputs-client-new-address/draggable-marker-new-location-service.service";
import {GoogleStyledMapModule} from "../../../app-core/google-styled-map/google-styled-map.module";

@NgModule({
  imports: [
    SharedModule,
    ClientCommonTemplateLayoutsModule,
    AgmCoreModule,
    ReactiveFormsModule,
    GoogleStyledMapModule,
  ],
  declarations: [
    ClientNewAddressComponent,
    GoogleMapsInputNewClientAddressComponent,
    ConfirmGoogleMapsInputNewClientAddressComponent,
  ],
  providers: [
    ClientCreateNewAddressService,
    AddressSharedService,
    DraggableMarkerNewLocationService,
  ],

})
export class ClientNewAddressModule {}
