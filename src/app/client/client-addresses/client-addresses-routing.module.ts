import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ClientAddressesComponent} from "./client-addresses.component";
import {ClientAddressesDashboardComponent} from "./client-addresses-dashboard/client-addresses-dashboard.component";
import {CanDeactivateGuard} from "../../can-deactivate-guard.service";
import {ClientNewAddressComponent} from "./client-new-address/client-new-address.component";
import {GoogleMapsInputNewClientAddressComponent} from "./client-new-address/google-maps-input-new-client-address/google-maps-input-new-client-address.component";
import {ConfirmGoogleMapsInputNewClientAddressComponent} from "./client-new-address/user-custom-inputs-client-new-address/confirm-google-maps-input-new-client-addres.component";

const clientRoutes: Routes = [
  {
    path: '',
    component: ClientAddressesComponent,

    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: ClientAddressesDashboardComponent
          },
          {
            path: 'new',
            component: ClientNewAddressComponent,
            children: [
              {
                path: '',
                component: GoogleMapsInputNewClientAddressComponent,
              },
            ]
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
export class ClientAddressesRoutingModule { }
