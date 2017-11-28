import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {ClientCommonTemplateLayoutsModule} from "../../client-common-template-layouts/client-common-template-layouts.module";
import {ClientAddressesDashboardComponent} from "./client-addresses-dashboard.component";
import {ClientDashboardGetAllClientAddressesService} from "./client-addresses-dashboard-get-all-client-addresses-service.service";
import {ClientDashboardDeleteAddressesService} from "./client-addresses-dashboard-delete-address-service.service";

@NgModule({
  imports: [
    SharedModule,
    ClientCommonTemplateLayoutsModule,

  ],

  declarations: [
    ClientAddressesDashboardComponent,
  ],
  providers: [
    ClientDashboardGetAllClientAddressesService,
    ClientDashboardDeleteAddressesService,
  ],
})
export class ClientAddressesDashboardModule {}
