import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CommonTemplateLayoutModule} from "../../app-core/common-template-layout/common-template-layout.module";
import {ChooseAddressCheckoutComponent} from "./choose-address-checkout.component";
import {ClientDashboardGetAllClientAddressesService} from "../../client/client-addresses/client-addresses-dashboard/client-addresses-dashboard-get-all-client-addresses-service.service";

@NgModule({
  imports: [
    // we import the shared module to load some basic application standard modules
    SharedModule,
    CommonTemplateLayoutModule,
  ],
  declarations: [
    ChooseAddressCheckoutComponent,
  ],
  providers: [
    ClientDashboardGetAllClientAddressesService,
  ],
  exports: [


  ],
})
export class ChooseAddressCheckoutModule { }
