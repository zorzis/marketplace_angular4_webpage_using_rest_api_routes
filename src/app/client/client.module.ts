import { NgModule }       from '@angular/core';


import {SharedModule} from "../shared/shared.module";
import {ClientRoutingModule} from "./client-routing.module";
import {CommonTemplateLayoutModule} from "../app-core/common-template-layout/common-template-layout.module";
import {ClientCommonTemplateLayoutsModule} from "./client-common-template-layouts/client-common-template-layouts.module";

import {ClientComponent} from "./client.component";
import {ClientDashboardComponent} from "./client-dashboard/client-dashboard.component";
import {ClientProfileModule} from "./client-profile/client-profile.module";
import {ClientAddressesModule} from "./client-addresses/client-addresses.module";
import {ClientOrdersDashboardModule} from "./client-orders/client-orders-dashboard/client-orders-dashboard.module";
import {ClientOrderSingleModule} from "./client-orders/client-order-single/client-order-single.module";



@NgModule({
  imports: [
    SharedModule,
    CommonTemplateLayoutModule,
    ClientRoutingModule,
    ClientCommonTemplateLayoutsModule,
    ClientProfileModule,
    ClientAddressesModule,
  ],
  declarations: [
    ClientComponent,
    ClientDashboardComponent,
  ],
  exports: [
  ],
  providers: [
  ],
})
export class ClientModule {}
