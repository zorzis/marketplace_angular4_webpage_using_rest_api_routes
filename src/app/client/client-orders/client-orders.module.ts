import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {ClientCommonTemplateLayoutsModule} from "../client-common-template-layouts/client-common-template-layouts.module";
import {ClientOrdersRoutingModule} from "./client-orders-routing.module";
import {ClientOrderSingleModule} from "./client-order-single/client-order-single.module";
import {ClientOrdersDashboardModule} from "./client-orders-dashboard/client-orders-dashboard.module";
import {ClientOrdersComponent} from "./client-orders.component";

@NgModule({
  imports: [
    SharedModule,
    ClientCommonTemplateLayoutsModule,
    ClientOrdersRoutingModule,
    ClientOrdersDashboardModule,
    ClientOrderSingleModule,
  ],

  declarations: [
    ClientOrdersComponent,
  ],
  providers: [
  ],

})
export class ClientOrdersModule {}
