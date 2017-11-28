import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProducersSearchComponent} from "./producers-search.component";
import {ProducersSearchMainComponent} from "./producers-search-main/producers-search-main.component";


const producersSearchRoutes: Routes = [
  {
    path: '',
    component: ProducersSearchComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: ProducersSearchMainComponent
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(producersSearchRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProducersSearchRoutingModule { }
