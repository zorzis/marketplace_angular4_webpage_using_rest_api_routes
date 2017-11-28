import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {CommonTemplateLayoutModule} from "../app-core/common-template-layout/common-template-layout.module";
import {ProducersSearchRoutingModule} from "./producers-search-routing.module";
import {ProducersSearchMainModule} from "./producers-search-main/producers-search-main.module";
import {ProducersSearchComponent} from "./producers-search.component";
import {FilteredDataSharedService} from "./shared-service-filtered-data.service";


@NgModule({
  imports: [
    SharedModule,
    CommonTemplateLayoutModule,
    ProducersSearchRoutingModule,
    ProducersSearchMainModule,
  ],
  declarations: [
    ProducersSearchComponent,
  ],
  exports: [
  ],
  providers: [
    FilteredDataSharedService,
  ],

})
export class ProducersSearchModule {}

