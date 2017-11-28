import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {ClientProfileComponent} from "./client-profile.component";
import {ClientProfileService} from "./client-profile.service";
import {ClientCommonTemplateLayoutsModule} from "../client-common-template-layouts/client-common-template-layouts.module";


@NgModule({
  imports: [
    SharedModule,
    ClientCommonTemplateLayoutsModule,

  ],

  declarations: [
    ClientProfileComponent,
  ],



  providers: [
    ClientProfileService,
  ],

})
export class ClientProfileModule {}
