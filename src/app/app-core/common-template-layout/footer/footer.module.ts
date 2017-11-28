import { NgModule }           from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FooterComponent} from "./footer.component";


@NgModule({
  imports: [
    // we import the shared module to load some basic application standard modules
    SharedModule,

  ],
  declarations: [

    FooterComponent,
  ],
  providers: [
  ],
  exports: [
    FooterComponent,

  ],
})
export class FooterModule { }
