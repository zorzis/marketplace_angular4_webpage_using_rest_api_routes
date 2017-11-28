import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../auth/auth.service";
import {ClientDashboardGetAllClientAddressesService} from "./client-addresses-dashboard-get-all-client-addresses-service.service";
import {AuthenticatedUser} from "../../../auth/model/authenticated-user.model";
import {NotificationService} from "../../../notifications/notificationsSharedService.service";
import {Router} from "@angular/router";
import {ErrorNotification} from "../../../notifications/notificationModelError.model";
import {Address} from "../../../model/address.model";
import {ClientDashboardDeleteAddressesService} from "./client-addresses-dashboard-delete-address-service.service";
import {SuccessNotification} from "../../../notifications/notificationModelSuccess.model";

@Component({
  selector: 'client-addresses-dashboard-selector',
  templateUrl: './client-addresses-dashboard.component.html',
})

export class ClientAddressesDashboardComponent implements OnInit{

  private authenticatedUser: AuthenticatedUser;
  private notification: any;
  private clientAddress: Address;
  private clientAddressesArray: Array<Address>;

  private addressIDForDeletionGettedFromUI: number;

  constructor( private authService: AuthService,
               private clientAddressesDashboardService: ClientDashboardGetAllClientAddressesService,
               private clientDashboardDeleteAddressesService: ClientDashboardDeleteAddressesService,
               private notificationService: NotificationService,
               private router: Router) {

  }

  ngOnInit() {
    console.log('Hello from ClientProfileComponent::OnInit');
    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();
    this.getClientAddressesFromServerResponse();
  }

  private getClientAddressesFromServerResponse() {
    console.log('Hello from ClientAddressesDashboardComponent::getClientAddressesFromServerResponse()');

    // check if clientEmail as retrieved from localStorage is present for the request
    if (this.clientAddressesDashboardService.parameterIsNull(this.authenticatedUser.getEmail()) === true){
      this.notification = new ErrorNotification();
      this.notification.setMessage('Κάποιο πρόβλημα προέκυψε με το αίτημα σας. Αν το πρόβλημα παραμένει παρακαλούμε αποσυνδεθείτε και συνδεθείτε ξανά!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }

    // Call the service and get the Observable Response
    this.clientAddressesDashboardService.getClientAddresses(this.authenticatedUser.email)
      .subscribe(
        clientAddressesArrayFromResponse => {


          this.clientAddressesArray = clientAddressesArrayFromResponse;

          console.log('Client Addresses Array length is: ' + this.clientAddressesArray.length);
          for (let i=0; i<this.clientAddressesArray.length; i++) {
            this.clientAddress = this.clientAddressesArray[i];
          }

        },
        error => {
          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          console.log('Unsuccessful request!');
          console.log('Error getting the client addresses array from server follows: ' + this.notification.message);
          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);
          }
          this.notificationService.updateNotificationData(this.notification);
        }
      );
  }


  private deleteClientAddress(clientAddressID: string) {
    console.log('Hello from ClientAddressesDashboardComponent::deleteClientAddress()');

    // check if clientEmail as retrieved from localStorage is present for the request
    if (this.clientAddressesDashboardService.parameterIsNull(this.authenticatedUser.getEmail()) === true){
      this.notification = new ErrorNotification();
      this.notification.setMessage('Κάποιο πρόβλημα προέκυψε με το αίτημα σας. Αν το πρόβλημα παραμένει παρακαλούμε αποσυνδεθείτε και συνδεθείτε ξανά!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }

    if (this.clientAddressesDashboardService.parameterIsNull(clientAddressID) === true){
      this.notification = new ErrorNotification();
      this.notification.setMessage('Κάποιο πρόβλημα προέκυψε με το αίτημα σας. Αν το πρόβλημα παραμένει παρακαλούμε αποσυνδεθείτε και συνδεθείτε ξανά!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }

    this.clientDashboardDeleteAddressesService.deleteClientAddress(this.authenticatedUser.email, clientAddressID)
      .subscribe(
        success => {
          this.notification = new SuccessNotification();
          this.notification.setMessage('Η διεύθυνση διαγράφηκε με επιτυχία!');
          this.notificationService.updateNotificationData(this.notification);

          this.getClientAddressesFromServerResponse();
        },
        error => {
          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          console.log('Unsuccessful request!');
          console.log('Error getting the client addresses array from server follows: ' + this.notification.message);
          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);
          }
          this.notificationService.updateNotificationData(this.notification);
        }

      );
  }


  // get the AddressID for deletion
  private setAddressIdForDeletion(addressIDForDeletion: number) {
    this.addressIDForDeletionGettedFromUI = addressIDForDeletion;
  }

}
