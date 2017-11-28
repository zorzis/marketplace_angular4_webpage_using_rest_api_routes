/* tslint:disable:member-ordering no-unused-variable */
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

import {AuthService} from "../auth/auth.service";
import {AuthGuard} from "../auth-guard.service";
import {HomePageModule} from "../homepage/homepage.module";
import {PageNotFoundModule} from "../page-not-found/page-not-found.module";
import {NotificationsModule} from "../notifications/notifications.module";
import {DialogService} from "../dialog.service";
import {AgmCoreModule} from "@agm/core";
import {ProducerSharedService} from "../producer/producer-shared-service.service";
import {ShopingCartModule} from "./common-template-layout/header/shoping-cart/shoping-cart.module";
import {ShopingCartService} from "../shoping-cart-shared-service.service";
import {OrderCheckoutModule} from "../order-checkout/order-checkout.module";
import {SearchCriteriaFilterDataSharedService} from "../producers-search/search-criteria-filter-shared-service.service";

@NgModule({
  imports:      [
    HomePageModule,
    PageNotFoundModule,
    NotificationsModule,
    ShopingCartModule,
    OrderCheckoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBKoKJRnIdv8OpSxX7uWMwPKg0eLh9rYl0',
      libraries: ["places"],
    }),
  ],
  declarations: [
  ],
  exports: [
    NotificationsModule,
    ShopingCartModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    DialogService,
    ProducerSharedService,
    ShopingCartService,
    SearchCriteriaFilterDataSharedService,

  ],
})

export class AppCoreModule {

  constructor (@Optional() @SkipSelf() parentModule: AppCoreModule) {
    if (parentModule) {
      throw new Error(
        'AppCoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppCoreModule,
      providers: []
    };
  }
}
