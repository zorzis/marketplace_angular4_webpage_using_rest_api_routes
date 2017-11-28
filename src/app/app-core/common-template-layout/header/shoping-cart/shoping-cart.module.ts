import { NgModule }           from '@angular/core';
import {SharedModule} from "../../../../shared/shared.module";
import {ShopingCartComponent} from "./shoping-cart.component";

@NgModule({
  imports: [
    // we import the shared module to load some basic application standard modules
    SharedModule,
  ],
  declarations: [
    ShopingCartComponent,
  ],
  providers: [
  ],
  exports: [
    ShopingCartComponent,
  ],
})
export class ShopingCartModule { }
