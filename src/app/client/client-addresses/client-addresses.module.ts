import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {ClientCommonTemplateLayoutsModule} from "../client-common-template-layouts/client-common-template-layouts.module";
import {ClientAddressesComponent} from "./client-addresses.component";
import {ClientNewAddressModule} from "./client-new-address/client-new-address.module";
import {ClientAddressesDashboardModule} from "./client-addresses-dashboard/client-addresses-dashboard.module";
import {ClientAddressesRoutingModule} from "./client-addresses-routing.module";

@NgModule({
  imports: [
    SharedModule,
    ClientCommonTemplateLayoutsModule,
    ClientAddressesRoutingModule,
    ClientAddressesDashboardModule,
    ClientNewAddressModule,
  ],
  declarations: [
    ClientAddressesComponent,
  ],

  providers: [

  ],

})
export class ClientAddressesModule {}
