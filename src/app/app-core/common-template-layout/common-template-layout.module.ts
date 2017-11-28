import { NgModule }           from '@angular/core';

import {SharedModule} from "../../shared/shared.module";
import {HeaderModule} from "./header/header.module";
import {FooterModule} from "./footer/footer.module";



@NgModule({
  imports: [
    // we import the shared module to load some basic application standard modules
    SharedModule,

    HeaderModule,
    FooterModule,
  ],
  declarations: [
  ],
  providers: [
  ],
  exports: [
    HeaderModule,
    FooterModule,
  ],
})
export class CommonTemplateLayoutModule { }
