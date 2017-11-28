import {Component, NgZone, OnDestroy, OnInit} from "@angular/core";
import {AuthenticatedUser} from "../../../../auth/model/authenticated-user.model";
import {Client} from "../../../../model/client.model";
import {Address} from "../../../../model/address.model";
import {AuthService} from "../../../../auth/auth.service";

import {ClientCreateNewAddressService} from "../client-new-address.service";
import {NotificationService} from "../../../../notifications/notificationsSharedService.service";
import {Router} from "@angular/router";
import {DialogService} from "../../../../dialog.service";
import {SuccessNotification} from "../../../../notifications/notificationModelSuccess.model";
import {ErrorNotification} from "../../../../notifications/notificationModelError.model";
import {AddressSharedService} from "../google-maps-location-shared-service.service";
import {Subscription} from "rxjs/Subscription";
import {Marker} from "../../../../model/marker.model";
import {DraggableMarkerNewLocationService} from "./draggable-marker-new-location-service.service";



@Component({
  selector: 'confirm-google-maps-input-new-client-address-selector',
  templateUrl: './confirm-google-maps-input-new-client-address.component.html',
  styleUrls: ['./confirm-google-maps-input-new-client-address.component.css'],

})



export class ConfirmGoogleMapsInputNewClientAddressComponent implements OnInit, OnDestroy {

  private authenticatedUser: AuthenticatedUser;
  private client: Client;

  private clientAddress: Address;
  private notification: any;

  private clientAddressFieldStreet: string;
  private clientAddressFieldStreetNumber: string;
  private clientAddressFieldCity: string;
  private clientAddressFieldPostalCode: string;
  private clientAddressFieldState: string;
  private clientAddressFieldCountry: string;
  private clientAddressFieldFloor: string;


  public zoom: number;

  private isConfirmationEnabled = false;

  private addressSharedServiceObservable: Subscription;
  private isConfirmationEnabledSharedServiceObservable: Subscription;

  private marker: Marker;

  constructor(private authService: AuthService,
              private ngZone: NgZone,
              private clientCreateNewAddressService: ClientCreateNewAddressService,
              private addressSharedService: AddressSharedService,
              private notificationService: NotificationService,
              private router: Router,
              public dialogService: DialogService,
              private draggableMarkerNewLocationService: DraggableMarkerNewLocationService) {

  }

  ngOnInit() {

    console.log('Hello from ConfirmGoogleMapsInputNewClientAddressComponent::OnInit');
    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();

    // init the client object
    this.client = new Client();
    this.client.email = this.authenticatedUser.email;

    this.getIsConfirmationEnabledFromSharedService();

    // we just subscribe to shared service
    // so we can take the Address from Google Autocomplete Componenet
    // if exists any
    this.getAddressDataFromSharedService();

    // just initialize the map and marker to a default position
    // without constructing any Address Object
    // cause we want to be null values to form fields in case somebody want to fill it by himself/herself
    this.setDefaultInitPosition();
  }

  ngOnDestroy(): void {
    this.isConfirmationEnabledSharedServiceObservable.unsubscribe();
    this.addressSharedServiceObservable.unsubscribe();
  }



  private mergeFormFieldsDataWithAddressObjectData() {

    this.clientAddressFieldStreet = this.clientAddress.street;
    this.clientAddressFieldStreetNumber = this.clientAddress.streetNumber;
    this.clientAddressFieldCity = this.clientAddress.city;
    this.clientAddressFieldPostalCode = this.clientAddress.postalCode;
    this.clientAddressFieldState = this.clientAddress.state;
    this.clientAddressFieldCountry = this.clientAddress.country;
  }

  private setPositionFromSharedService() {
    this.zoom = 16;

    this.marker = new Marker();
    this.marker.lat = this.clientAddress.latitude;
    this.marker.lng = this.clientAddress.longitude;
    this.marker.draggable = true;

    this.mergeFormFieldsDataWithAddressObjectData();
  }

  // set the google maps at Athens City Center (Aiolou - Panepistimiou)
  private setDefaultInitPosition() {
    //set google maps defaults
    this.marker = new Marker();
    this.marker.lat = 37.983550;
    this.marker.lng = 23.729280;
    this.marker.draggable = true;

    this.zoom = 14;
  }


  // TODO needs some modification in order to work correctly
  // todo but it depends on the setup of the fields so let it unconstructed yet
  canDeactivate(): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no Client detail or the Client is unchanged
    if (
      !this.client || (
        (this.clientAddressFieldStreet === this.clientAddress.street || !this.clientAddressFieldStreet)
        &&  (this.clientAddressFieldStreetNumber === this.clientAddress.streetNumber || !this.clientAddressFieldStreetNumber)
        &&  (this.clientAddressFieldCity === this.clientAddress.city || !this.clientAddressFieldCity)
        &&  (this.clientAddressFieldPostalCode === this.clientAddress.postalCode || !this.clientAddressFieldPostalCode)
        &&  (this.clientAddressFieldState === this.clientAddress.state || !this.clientAddressFieldState)
        &&  (this.clientAddressFieldCountry === this.clientAddress.country || !this.clientAddressFieldCountry)
        &&  (this.clientAddressFieldFloor === this.clientAddress.floor || !this.clientAddressFieldFloor)

      )
    ) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Έχετε αλλάξει κάποια στοιχεία.Θέλετε να συνεχίσετε χωρίς να σώσετε τις αλλαγές?');
  }

  public onCreateNewAddress() {

    console.log('Hello from ClientNewAddressComponent::onCreateNewAddress');

    this.clientAddress.street = this.clientAddressFieldStreet;
    this.clientAddress.streetNumber = this.clientAddressFieldStreetNumber;
    this.clientAddress.city = this.clientAddressFieldCity;
    this.clientAddress.postalCode = this.clientAddressFieldPostalCode;
    this.clientAddress.state = this.clientAddressFieldState;
    this.clientAddress.country = this.clientAddressFieldCountry;
    this.clientAddress.floor = this.clientAddressFieldFloor;




    // check if authentication token is still valid for client
    // so the request can continue when button is clicked or dismiss
    if (this.authService.isUserAuthenticated() !== true) {
      this.notification = new ErrorNotification();
      this.notification.setMessage('Η συνεδρία σας έληξε. Παρακαλούμε συνδεθείτε ξανά!');
      this.notificationService.updateNotificationData(this.notification);
      this.router.navigateByUrl('/auth');

      return;
    }

    this.clientCreateNewAddressService.onCreateNewAddress(this.client, this.clientAddress)
      .subscribe(
        success => {

          this.notification = new SuccessNotification();
          this.notification.setMessage('Η διεύθυνσή σου προστέθηκε με επιτυχία!');
          this.notificationService.updateNotificationData(this.notification);

          this.router.navigateByUrl('/account/addresses');

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

  private getLocationFromDraggableMarkerMovement($event: any) {
    console.log('Hello from getLocationFromDraggableMarkerMovement');
    this.draggableMarkerNewLocationService.moveMarkerAndGetNewLocation($event)
      .subscribe(
        result => {
          // needs to run inside zone to update the map
          this.ngZone.run(() => {
            this.clientAddress = result;

            this.marker = new Marker();
            this.marker.lat = this.clientAddress.latitude;
            this.marker.lng = this.clientAddress.longitude;
            this.marker.draggable = true;

            this.mergeFormFieldsDataWithAddressObjectData();
          });
        },
        error => {
          console.log(error),
            () => console.log('Geocoding completed!')
        }
      );
  }



  private getAddressDataFromSharedService(): void {
    console.log('Hello from ConfirmGoogleMapsInputNewClientAddressComponent::getAddressDataFromSharedService()');
    let sharedAddressServiceObservable = this.addressSharedService.getAddressData();
    this.addressSharedServiceObservable = sharedAddressServiceObservable
      .subscribe(
        address => {
          this.ngZone.run(()=> {
            this.clientAddress = <Address>address;
            console.log('Address recieved from ConfirmGoogleMapsInputNewClientAddressComponent is:');
            this.clientAddress.printAddressDetails();
            this.setPositionFromSharedService();
          });
        });
  }


  private getIsConfirmationEnabledFromSharedService(): void {
    console.log('Hello from ConfirmGoogleMapsInputNewClientAddressComponent::getIsConfirmationEnabledFromSharedService()');
    let isConfirmationServiceObservable = this.addressSharedService.getIsConfirmationEnabled();
    this.isConfirmationEnabledSharedServiceObservable = isConfirmationServiceObservable
      .subscribe(
        booleanConfirm => {
          this.ngZone.run(()=> {
            this.isConfirmationEnabled = <boolean>booleanConfirm;
            console.log('Confirmation recieved from ConfirmGoogleMapsInputNewClientAddressComponent is: ' + this.isConfirmationEnabled);
          });
        });
  }


  private isConfirmationCheckoutEnabled(): boolean
  {
    if(!this.isConfirmationEnabled) {
      return false;
    }
    return true;
  }

  private goBackToGoogleAutocompleteSearchAddress() {
    this.isConfirmationEnabled = false;
    this.addressSharedService.updateIsConfirmationEnabled(this.isConfirmationEnabled);
  }

}

