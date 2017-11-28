import {NgModule} from "@angular/core";
import {ShoppingCartCheckoutComponent} from "./shopping-cart-checkout.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    // we import the shared module to load some basic application standard modules
    SharedModule,
  ],
  declarations: [
    ShoppingCartCheckoutComponent,
  ],
  providers: [

  ],
  exports: [

  ],
})
export class ShoppingCartCheckoutModule { }
