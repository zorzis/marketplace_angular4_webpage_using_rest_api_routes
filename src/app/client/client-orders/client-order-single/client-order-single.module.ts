import {NgModule} from "@angular/core";
import {ClientOrderSingleComponent} from "./client-order-single.component";
import {ClientOrderSingleService} from "./client-order-single.service";
import {SharedModule} from "../../../shared/shared.module";
import {ClientCommonTemplateLayoutsModule} from "../../client-common-template-layouts/client-common-template-layouts.module";

@NgModule({
  imports: [
    SharedModule,
    ClientCommonTemplateLayoutsModule,
  ],

  declarations: [
    ClientOrderSingleComponent,
  ],

  providers: [
    ClientOrderSingleService,
  ],

})
export class ClientOrderSingleModule {}
