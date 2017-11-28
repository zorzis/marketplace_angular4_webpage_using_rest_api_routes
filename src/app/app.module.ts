import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from "@angular/router";

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import {AppCoreModule} from "./app-core/app-core.module";

@NgModule({
  imports: [
    BrowserModule,
    AppCoreModule.forRoot(),
    AppRoutingModule,
  ],

  declarations: [
    AppComponent,
  ],
  providers: [
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 4));
  }
}

