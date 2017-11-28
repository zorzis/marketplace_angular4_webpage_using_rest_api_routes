import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ClientOrdersDashboardComponent} from "./client-orders-dashboard/client-orders-dashboard.component";
import {ClientOrderSingleComponent} from "./client-order-single/client-order-single.component";
import {ClientOrdersComponent} from "./client-orders.component";


const ordersRoutes: Routes = [
  {
    path: '',
    component: ClientOrdersComponent,
    children: [
      {
        path: '',
        component: ClientOrdersDashboardComponent,
      },

      {
        path: ':id',
        component: ClientOrderSingleComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ordersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientOrdersRoutingModule { }
