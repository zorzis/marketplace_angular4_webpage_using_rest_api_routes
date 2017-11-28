import {Component, OnDestroy, OnInit, NgZone, OnChanges, SimpleChanges} from '@angular/core';
import {ProducerService} from "./producer-service.service";
import {NotificationService} from "../notifications/notificationsSharedService.service";

import {ActivatedRoute, Params, Router} from "@angular/router";
import {ErrorNotification} from "../notifications/notificationModelError.model";
import {Producer} from "../model/producer.model";

import 'rxjs/add/operator/switchMap';
import {ProducerSharedService} from "./producer-shared-service.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'producer-module-selector',
  templateUrl: './producer.component.html',
})

export class ProducerComponent implements OnInit {

  private notification: any;
  private producer: Producer;


  constructor(private producerService: ProducerService,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private producerSharedService: ProducerSharedService,
              private ngZone: NgZone) {

  }

  ngOnInit() {
    console.log('Hello from ProducerComponent::ngOnInit()');

    this.activatedRoute.params
    // (+) converts string 'id' to a number
      .subscribe((params: Params) => {
        this.getProducerFromServerResponse(params['id'])
      });

  }

  private getProducerFromServerResponse(producerID: string) {
    console.log('Hello from ProducerComponent::getProducerFromServerResponse()');

    this.producerService.getProducerFromServer(producerID)
      .subscribe(
        producerFromServer => {
          this.ngZone.run(()=> {
            this.producer = <Producer>producerFromServer;

            // send the producer object to the shared service so it can be used accross all
            // producer profile components and services
            this.producerSharedService.updateProducerData(this.producer);
          });
        },


        error =>  {
          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          console.log('Unsuccessful request!');
          console.log('Error getting the client profile from server follows: ' + this.notification.message);
          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);
          }
          this.notificationService.updateNotificationData(this.notification);

          this.router.navigateByUrl('/');
        }
      );
  }

}
