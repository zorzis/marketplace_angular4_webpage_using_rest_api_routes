import {Component, Input, NgZone, OnDestroy, OnInit} from "@angular/core";
import {Producer} from "../../../model/producer.model";
import {Marker} from "../../../model/marker.model";
import {FilteredDataSharedService} from "../../shared-service-filtered-data.service";
import {Subscription} from "rxjs/Subscription";
@Component({
  selector: 'map-results-selector',
  templateUrl: './map-results.component.html',
  styleUrls: ['./map-results.component.css'],

})

export class MapResultsComponent implements OnInit, OnDestroy{

  private filteredProducersResults: Array<Producer>;

  private producer: Producer;

  private markerArray: Array<Marker> = new Array<Marker>();

  private notification: any;

  private latitude: number;
  private longitude: number;
  private zoom: number;

  private producersArraySharedServiceObservable: Subscription;


  constructor(private filteredProducersArraySharedService: FilteredDataSharedService,
              private ngZone: NgZone) {
    console.log('Hello from MapResultsComponent:constructor');


  }

  ngOnInit(): void {
    console.log('Hello from MapResultsComponent:OnInit');
    this.setDefaultInitPosition();

    this.getProducersArrayFromSharedService();


  }
  
  
  ngOnDestroy(): void {
    this.producersArraySharedServiceObservable.unsubscribe();
  }

  private getProducersArrayFromSharedService(): void {
    console.log('Hi From MapResultsComponent::getProducersArrayFromSharedService');
    const sharedServiceObservable = this.filteredProducersArraySharedService.getProducersArrayObservableData();
    this.producersArraySharedServiceObservable = sharedServiceObservable
      .subscribe(
        producersArrayFromSharedService => {
          this.ngZone.run(() => {
            this.filteredProducersResults = <Array<Producer>>producersArrayFromSharedService;
            if(this.filteredProducersResults) {

            }
          });
        });
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
