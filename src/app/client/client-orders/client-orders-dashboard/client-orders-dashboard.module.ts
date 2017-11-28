import {NgModule} from "@angular/core";

import {ClientOrdersDashboardComponent} from "./client-orders-dashboard.component";
import {ClientOrdersDashboardService} from "./client-orders-dashboard.service";
import {SharedModule} from "../../../shared/shared.module";
import {ClientCommonTemplateLayoutsModule} from "../../client-common-template-layouts/client-common-template-layouts.module";

@NgModule({
  imports: [
    SharedModule,
    ClientCommonTemplateLayoutsModule,
  ],

  declarations: [
    ClientOrdersDashboardComponent,
  ],

  providers: [
    ClientOrdersDashboardService,
  ],


})
export class ClientOrdersDashboardModule {}
