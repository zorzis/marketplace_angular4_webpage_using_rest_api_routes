import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";

import {PageNotFoundComponent} from "./page-not-found.component";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    PageNotFoundComponent,
  ],
})
export class PageNotFoundModule {}
