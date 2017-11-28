import {NgModule} from "@angular/core";
import {OrderCheckoutComponent} from "./order-checkout.component";
import {SharedModule} from "../shared/shared.module";
import {CommonTemplateLayoutModule} from "../app-core/common-template-layout/common-template-layout.module";
import {ShoppingCartCheckoutModule} from "./shopping-cart-checkout/shopping-cart-checkout.module";
import {OrderCheckoutRoutingModule} from "./order-checkout-routing.module";
import {ChooseAddressCheckoutModule} from "./choose-address-checkout/choose-address-checkout.module";
import {PaymentCheckoutModule} from "./payment-checkout/payment-checkout.module";





@NgModule({
  imports: [
    // we import the shared module to load some basic application standard modules
    SharedModule,
    CommonTemplateLayoutModule,
    OrderCheckoutRoutingModule,
    ShoppingCartCheckoutModule,
    ChooseAddressCheckoutModule,
    PaymentCheckoutModule,
  ],


  declarations: [
    OrderCheckoutComponent,
  ],
  providers: [
  ],
  exports: [

  ],
})
export class OrderCheckoutModule { }
