import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./registration.component";



const registrationRoutes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(registrationRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class RegistrationRoutingModule { }
