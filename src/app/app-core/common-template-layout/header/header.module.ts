import { NgModule }           from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {HeaderComponent} from "./header.component";
import {HeaderLoggedUserNavComponent} from "./header-logged-user-nav/header-logged-user-nav.component";
import {ShopingCartModule} from "./shoping-cart/shoping-cart.module";




@NgModule({
  imports: [
    // we import the shared module to load some basic application standard modules
    SharedModule,
    ShopingCartModule,
  ],
  declarations: [
    HeaderComponent,
    HeaderLoggedUserNavComponent,
  ],
  providers: [

  ],
  exports: [
    HeaderComponent,
    HeaderLoggedUserNavComponent,

  ],
})
export class HeaderModule { }
