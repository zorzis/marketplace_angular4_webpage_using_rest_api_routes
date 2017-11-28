import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {GoogleStyledMapComponent} from "./google-maps-style.component";

@NgModule({
  imports: [
    // we import the shared module to load some basic application standard modules
    SharedModule,
  ],
  declarations: [
    GoogleStyledMapComponent,
  ],
  providers: [
  ],
  exports: [
    GoogleStyledMapComponent,
  ],
})
export class GoogleStyledMapModule { }
