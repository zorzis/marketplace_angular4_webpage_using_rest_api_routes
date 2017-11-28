import {Component, NgZone, OnInit} from '@angular/core';
import {NotificationService} from "../../notifications/notificationsSharedService.service";
import {HomepageProducersOnTheMapService} from "./homepage-producers-on-the-map-service.service";
import {ErrorNotification} from "../../notifications/notificationModelError.model";
import {Producer} from "../../model/producer.model";
import {Marker} from "../../model/marker.model";
import {Router} from "@angular/router";
import {ProducersSearchMainService} from "../../producers-search/producers-search-main/producers-search-main-service.service";
import {SearchFilterCriteria} from "../../model/search-filter-criteria.model";

@Component({
  selector: 'homepage-producers-on-the-map-selector',
  templateUrl: './homepage-producers-on-the-map.component.html',
  styleUrls: ['./homepage-producers-on-the-map.component.css'],
})

export class HomepageProducersOnTheMapComponent implements OnInit {

  private notification: any;
  private producersArray: Array<Producer>;
  private searchFilterCriteria: SearchFilterCriteria = new SearchFilterCriteria();

  private latitude: number;
  private longitude: number;
  private zoom: number;

  constructor(private notificationService: NotificationService,
              private homepageGetProducersService: ProducersSearchMainService,
              private ngZone: NgZone,
              private router: Router) {

  }

  ngOnInit(): void {
    console.log('Hello from HomepageProducersOnTheMapComponent:OnInit');

    this.setDefaultInitPosition();

    this.getProducersFromService();
  }

  private getProducersFromService() {
    console.log('Hello from HomepageProducersOnTheMapComponent:getProducersFromServer()');

    this.homepageGetProducersService.searchForProducersResults(this.searchFilterCriteria)
      .subscribe(
        producersArrayFromResponse => {

          this.ngZone.run(() => {
            this.producersArray = producersArrayFromResponse;
          });
        },
        error => {
          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          console.log('Unsuccessful request!');
          console.log('Error getting the client profile from server follows: ' + this.notification.message);
          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);
          }
          this.notificationService.updateNotificationData(this.notification);
        }
      );
  }


  // we use this one NOT KNOW WHY because markers without conversion are not showing up
  private convertStringToNumber(value: any): number {
    return +value;
  }

  // set the google maps at Athens City Center (Aiolou - Panepistimiou)
  private setDefaultInitPosition() {
    //set google maps defaults
    this.zoom = 6;
    this.latitude = 37.983550;
    this.longitude = 23.729280;
  }



}
