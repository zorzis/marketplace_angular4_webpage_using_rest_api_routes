import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {ClientComponent} from "./client.component";
import {ClientDashboardComponent} from "./client-dashboard/client-dashboard.component";
import {ClientOrdersDashboardComponent} from "./client-orders/client-orders-dashboard/client-orders-dashboard.component";
import {AuthGuard} from "../auth-guard.service";
import {ClientProfileComponent} from "./client-profile/client-profile.component";
import {CanDeactivateGuard} from "../can-deactivate-guard.service";
import {ClientOrderSingleComponent} from "./client-orders/client-order-single/client-order-single.component";

const clientRoutes: Routes = [
  {
    path: '',
    component: ClientComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            component: ClientDashboardComponent
          },
          {
            path: 'profile',
            component: ClientProfileComponent,
            canDeactivate: [CanDeactivateGuard],
          },
          {
            path: 'orders',
            loadChildren: 'app/client/client-orders/client-orders.module#ClientOrdersModule',

          },
          {
            path: 'addresses',
            loadChildren: 'app/client/client-addresses/client-addresses.module#ClientAddressesModule',
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(clientRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientRoutingModule { }
