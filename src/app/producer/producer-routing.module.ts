import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProducerComponent} from "./producer.component";
import {ProducerProfileComponent} from "./producer-profile/producer-profile.component";
import {ProducerSpiritsComponent} from "./producer-spirits/producer-spirits.component";


const producerRoutes: Routes = [
  {
    path: '',
    component: ProducerComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: ProducerProfileComponent
          },
          {
            path: 'spirits',
            component: ProducerSpiritsComponent,
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(producerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProducerRoutingModule { }
