import { NgModule }           from '@angular/core';
import {HomePageComponent} from "./homepage.component";
import {SharedModule} from "../shared/shared.module";
import {CommonTemplateLayoutModule} from "../app-core/common-template-layout/common-template-layout.module";
import {HomepageProducersOnTheMapModule} from "./homepage-producers-on-the-map/homepage-producers-on-the-map.module";
import {HomePageSearchModule} from "./homepage-search-producers/homepage-search-producers.module";

@NgModule({
  imports: [
    SharedModule,
    CommonTemplateLayoutModule,
    HomepageProducersOnTheMapModule,
    HomePageSearchModule,
  ],
  declarations: [
    HomePageComponent,

  ],
  providers: [

  ],
})

export class HomePageModule { }
