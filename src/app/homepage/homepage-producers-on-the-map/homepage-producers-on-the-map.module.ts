import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {HomepageProducersOnTheMapComponent} from "./homepage-producers-on-the-map.component";
import {HomepageProducersOnTheMapService} from "./homepage-producers-on-the-map-service.service";

import {AgmCoreModule} from "@agm/core";
import {GoogleStyledMapModule} from "../../app-core/google-styled-map/google-styled-map.module";
import {GoogleMapsProducerInfoWindowComponent} from "./google-maps-producer-info-window.component";
import {ProducersSearchMainService} from "../../producers-search/producers-search-main/producers-search-main-service.service";


@NgModule({
  imports: [
    SharedModule,
    AgmCoreModule,
    GoogleStyledMapModule,

  ],
  declarations: [
    HomepageProducersOnTheMapComponent,
    GoogleMapsProducerInfoWindowComponent,
  ],
  exports: [
    HomepageProducersOnTheMapComponent,
    GoogleMapsProducerInfoWindowComponent,
  ],
  providers: [
    ProducersSearchMainService,
  ],
})

export class HomepageProducersOnTheMapModule {}
