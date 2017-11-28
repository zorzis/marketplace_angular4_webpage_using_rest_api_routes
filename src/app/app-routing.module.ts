import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomePageComponent} from "./homepage/homepage.component";
import {AuthGuard} from "./auth-guard.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {CanDeactivateGuard} from "./can-deactivate-guard.service";


const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule',
  },
  {
    path: 'registration',
    loadChildren: 'app/registration/registration.module#RegistrationModule',
  },
  {
    path: 'account',
    loadChildren: 'app/client/client.module#ClientModule',
    canLoad: [AuthGuard],
  },
  {
    path: 'producer/:id',
    loadChildren: 'app/producer/producer.module#ProducerModule',

  },
  {
    path: 'order',
    loadChildren: 'app/order-checkout/order-checkout.module#OrderCheckoutModule',
  },
  {
    path: 'search',
    loadChildren: 'app/producers-search/producers-search.module#ProducersSearchModule',
  },

  // otherwise redirect to Page not found 404
  {
    path: '**',
    component: PageNotFoundComponent,
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,

  ],
  providers: [
    CanDeactivateGuard,
  ]
})
export class AppRoutingModule { }
