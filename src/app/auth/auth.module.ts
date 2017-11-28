import { NgModule } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "./auth-routing.module";


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'access_token',
    // tokenGetter: (() => sessionStorage.getItem('token')),
    globalHeaders: [{'Content-Type': 'application/json'}, {'Content-Type': 'application/x-www-form-urlencoded'} ],
  }), http, options);
}

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],

  declarations: [
    AuthComponent,
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AuthModule {}
