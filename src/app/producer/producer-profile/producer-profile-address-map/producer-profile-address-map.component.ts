import {Component, Input, NgZone, OnDestroy, OnInit} from "@angular/core";
import {Producer} from "../../../model/producer.model";
import {ProducerSharedService} from "../../producer-shared-service.service";
import {Subscription} from "rxjs/Subscription";
import {Marker} from "../../../model/marker.model";

@Component({
  selector: 'producer-profile-address-map-selector',
  templateUrl: './producer-profile-address-map.component.html',
  styleUrls: ['./producer-profile-address-map.component.css'],

})

export class ProducerProfileAddressMapComponent implements OnInit {

  @Input()
  private producer: Producer;

  private marker: Marker;
  public zoom: number;


  constructor(private ngZone: NgZone) {

  }

  ngOnInit() {
    this.setPositionFromSharedService();
  }


  private setPositionFromSharedService() {

    this.ngZone.run(() => {

      this.zoom = 6;

      this.marker = new Marker();
      // we use the + sign to cast string to number
      this.marker.lat = +this.producer.producerAddress.latitude;
      this.marker.lng = +this.producer.producerAddress.longitude;
      this.marker.draggable = true;
    });
  }


}
