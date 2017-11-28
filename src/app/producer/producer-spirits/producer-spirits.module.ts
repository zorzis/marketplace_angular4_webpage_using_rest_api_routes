import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {ProducerCommonTemplateLayoutsModule} from "../producer-common-template-layouts/producer-common-template-layouts.module";
import {ProducerSpiritsComponent} from "./producer-spirits.component";

@NgModule({
  imports: [
    SharedModule,
    ProducerCommonTemplateLayoutsModule,
  ],
  declarations: [
    ProducerSpiritsComponent,
  ],
  providers: [
  ],
  exports: [
    ProducerSpiritsComponent,
  ],
})

export class ProducerSpiritsModule {}
