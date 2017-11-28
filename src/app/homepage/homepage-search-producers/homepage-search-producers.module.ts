import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CommonTemplateLayoutModule} from "../../app-core/common-template-layout/common-template-layout.module";
import {HomePageSearchProducersComponent} from "./homepage-search-producers.component";
import {GetProductsCategoriesService} from "../../producers-search/producers-search-main/get-products-categories.service";

@NgModule({
  imports: [
    SharedModule,
    CommonTemplateLayoutModule,
  ],
  declarations: [
    HomePageSearchProducersComponent,
  ],
  providers: [
    GetProductsCategoriesService,
  ],
  exports: [
    HomePageSearchProducersComponent,
  ],
})

export class HomePageSearchModule { }
