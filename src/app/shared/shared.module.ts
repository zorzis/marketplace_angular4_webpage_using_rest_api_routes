import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";


@NgModule({
  imports:      [
    CommonModule,
  ],
  declarations: [  ],
  exports:      [
    CommonModule,
    FormsModule,
    HttpModule,

    // importing the router module we guarantee that our nav links will work accross the application
    RouterModule,


  ],
})

export class SharedModule { }
