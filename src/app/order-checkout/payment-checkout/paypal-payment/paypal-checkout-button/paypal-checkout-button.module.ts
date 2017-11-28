import * as ngCore from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {Component, ElementRef, NgModule, NgZone} from "@angular/core";
import {PaypalCheckoutButtonComponent} from "./paypal-checkout-button.component";

declare const paypal:any;
export {paypal};

export const PayPalButtonModule = paypal.Button.driver('angular2', { Component, NgModule, ElementRef, NgZone });


@ngCore.NgModule({
  imports: [
    BrowserModule,
    PayPalButtonModule,
  ],
  declarations: [
    PaypalCheckoutButtonComponent,
  ],
  exports: [
    PayPalButtonModule,
    PaypalCheckoutButtonComponent,
  ],

})
export class PaypalCheckoutButtonModule {
  constructor () {
  }
}
