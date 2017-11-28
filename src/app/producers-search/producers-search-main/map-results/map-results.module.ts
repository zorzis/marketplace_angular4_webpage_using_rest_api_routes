import {NgModule} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {GoogleStyledMapModule} from "../../../app-core/google-styled-map/google-styled-map.module";
import {AgmCoreModule} from "@agm/core";
import {MapResultsComponent} from "./map-results.component";
import {GoogleMapsProducerInfoModalWindowComponent} from "./google-maps-producer-info-window.component";

@NgModule({
  imports: [
    SharedModule,
    AgmCoreModule,
    GoogleStyledMapModule,

  ],
  declarations: [
    MapResultsComponent,
    GoogleMapsProducerInfoModalWindowComponent,

  ],
  exports: [
    MapResultsComponent,
    GoogleMapsProducerInfoModalWindowComponent,
  ],
  providers: [
  ],
})


export class MapResultsModule {}
