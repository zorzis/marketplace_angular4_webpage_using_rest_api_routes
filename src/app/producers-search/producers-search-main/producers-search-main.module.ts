import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {ProducersSearchMainComponent} from "./producers-search-main.component";
import {GetProductsCategoriesService} from "./get-products-categories.service";
import {GetProducersService} from "./get-producers.service";
import {MapResultsModule} from "./map-results/map-results.module";
import {ProducersSearchMainService} from "./producers-search-main-service.service";
import {UiSwitchModule} from "angular2-ui-switch";


@NgModule({
  imports: [
    SharedModule,
    MapResultsModule,
    UiSwitchModule,

  ],

  declarations: [
    ProducersSearchMainComponent,
  ],


  providers: [
    ProducersSearchMainService,
    GetProductsCategoriesService,
    GetProducersService,
  ],
})


export class ProducersSearchMainModule {}
