import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RegistrationRoutingModule} from "./registration-routing.module";
import {RegistrationComponent} from "./registration.component";

@NgModule({
  imports: [
    SharedModule,
    RegistrationRoutingModule,
  ],

  declarations: [
    RegistrationComponent,
  ],

})
export class RegistrationModule {}
