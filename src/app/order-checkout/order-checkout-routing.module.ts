import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OrderCheckoutComponent} from "./order-checkout.component";
import {ShoppingCartCheckoutComponent} from "./shopping-cart-checkout/shopping-cart-checkout.component";
import {ChooseAddressCheckoutComponent} from "./choose-address-checkout/choose-address-checkout.component";
import {AuthGuard} from "../auth-guard.service";
import {PaymentCheckoutComponent} from "./payment-checkout/payment-checkout.component";



const orderCheckoutRoutes: Routes = [
  {
    path: 'order',
    component: OrderCheckoutComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: ShoppingCartCheckoutComponent,
          },

        ]
      },
      {
        path: 'delivery',
        component: ChooseAddressCheckoutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'billing',
        component: PaymentCheckoutComponent,
        canActivate: [AuthGuard],
      },
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(orderCheckoutRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderCheckoutRoutingModule { }
