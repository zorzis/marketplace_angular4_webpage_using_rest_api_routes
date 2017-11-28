import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {PaymentCheckoutComponent} from "./payment-checkout.component";
import {PayPalButtonModule, PaypalCheckoutButtonModule} from "./paypal-payment/paypal-checkout-button/paypal-checkout-button.module";
import {PaypalOrderCreateService} from "./paypal-payment/paypal-order-create-service.service";
import {PaypalPayOrderComponent} from "./paypal-payment/paypal-pay-order.component";
import {CashOnDeliveryOrderCreateService} from "./cash-on-delivery-payment/cash-on-delivery-order-create-service.service";
import {CashOnDeliveryPayOrderComponent} from "./cash-on-delivery-payment/cash-on-delivery-pay-order.component";

@NgModule({
  imports: [
    // we import the shared module to load some basic application standard modules
    SharedModule,
    // We import the Paypal XComponent to drive the paypal button functionality
    // from external checkout.js official paypal javascript file process operator
    PaypalCheckoutButtonModule,
    PayPalButtonModule,
  ],
  declarations: [
    PaymentCheckoutComponent,
    PaypalPayOrderComponent,
    CashOnDeliveryPayOrderComponent,
  ],
  providers: [
    PaypalOrderCreateService,
    CashOnDeliveryOrderCreateService,
  ],
  exports: [
  ],
})
export class PaymentCheckoutModule { }
