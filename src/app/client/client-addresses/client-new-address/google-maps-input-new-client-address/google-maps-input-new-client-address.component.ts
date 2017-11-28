import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import {FormControl} from "@angular/forms";

import {AuthService} from "../../../../auth/auth.service";
import {AuthenticatedUser} from "../../../../auth/model/authenticated-user.model";
import {Client} from "../../../../model/client.model";
import {Address} from "../../../../model/address.model";

import { MapsAPILoader } from '@agm/core';
import {AddressSharedService} from "../google-maps-location-shared-service.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'google-maps-input-new-client-address-selector',
  templateUrl: './google-maps-input-new-client-address.component.html',
  styleUrls: ['./google-maps-input-new-client-address.component.css'],

})



export class GoogleMapsInputNewClientAddressComponent implements OnInit {

  private authenticatedUser: AuthenticatedUser;
  private client: Client;
  private address: Address;
  private place: google.maps.places.PlaceResult;

  private isConfirmationEnabled: boolean = false;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;


  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private authService: AuthService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private addressSharedService: AddressSharedService,) {

  }

  ngOnInit() {
    console.log('Hello from GoogleMapsInputNewClientAddressComponent::OnInit');
    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();

    // init the client object
    this.client = new Client();
    this.client.email = this.authenticatedUser.email;

    // initialize the map to default coordinates
    this.setDefaultInitPosition();

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position based on browser auto inspect based on IP
    this.setCurrentPosition();

    //load Places Autocomplete
    this.getLocationFromAutocompleteGoogleAPIandShowPlaceOnMap();
  }



  private getLocationFromAutocompleteGoogleAPIandShowPlaceOnMap() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        /*types: ["street"]*/
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          this.place = autocomplete.getPlace();

          //verify result
          if (this.place.geometry === undefined || this.place.geometry === null) {
            return;
          }


          //set latitude, longitude and zoom
          this.latitude = this.place.geometry.location.lat();
          this.longitude = this.place.geometry.location.lng();
          this.zoom = 16;

          console.log('New Address using place.formatted_address.toString() is: ' + this.place.formatted_address.toString());

          this.address = new Address();
          this.address = this.address.constructAddressObjectFromGoogleMapsPlace(this.place);

        });
      });
    });

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 14;
      });
    }
  }

  // set the google maps at Athens City Center (Aiolou - Panepistimiou)
  private setDefaultInitPosition() {
    //set google maps defaults
    this.zoom = 14;
    this.latitude = 37.983550;
    this.longitude = 23.729280;
  }

  private clearGoogleAutocompleteAPISearchFormInput() {

    // set the searchElement to nothing value
    this.searchElementRef.nativeElement = "";

    // clear the search form values
    this.searchControl.setValue("");

    // clear the address object we have previously created
    this.address = null;

    // clear the let place: google.maps.places.PlaceResult
    this.place = null;

    // initializing the google map pin to the defaut location
    this.setDefaultInitPosition();
  }

  private isAddressExists():boolean {
    if (!this.address && !this.place) {
      return false;
    }
    return true;
  }


  private enableConfirmationAddressCheckout() {
    this.isConfirmationEnabled = true;
  }

  private isConfirmationCheckoutEnabled(): boolean
  {
    if(!this.isConfirmationEnabled) {
      return false;
    }
    return true;
  }


  private passAddressToSharedService() {
    this.enableConfirmationAddressCheckout();
    this.addressSharedService.updateIsConfirmationEnabled(this.isConfirmationEnabled);
    this.addressSharedService.updateAddressData(this.address);
  }

  private passConfirmationToSharedService() {
    this.enableConfirmationAddressCheckout();
    this.addressSharedService.updateIsConfirmationEnabled(this.isConfirmationEnabled);
  }


}
