import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {AuthenticatedUser} from "../../auth/model/authenticated-user.model";
import {ClientProfileService} from "./client-profile.service";
import {Client} from "../../model/client.model";
import {ErrorNotification} from "../../notifications/notificationModelError.model";
import {NotificationService} from "../../notifications/notificationsSharedService.service";
import {Router} from "@angular/router";
import {SuccessNotification} from "../../notifications/notificationModelSuccess.model";
import {DialogService} from "../../dialog.service";


@Component({
  selector: 'client-profile-selector',
  templateUrl: './client-profile.component.html',
})

export class ClientProfileComponent implements OnInit {
  private authenticatedUser: AuthenticatedUser;
  private client: Client;
  private notification: any;

  private clientFirstNameForUpdate: string;
  private clientLastNameForUpdate: string;
  private clientBirthDateForUpdate: string;
  private clientGenderForUpdate: string;

  constructor( private authService: AuthService,
               private clientProfileService: ClientProfileService,
               private notificationService: NotificationService,
               private router: Router,
               public dialogService: DialogService) {

  }

  // retrieve the stored authenticated user so we can proceed to the API call to retrieve client profile
  // using authenticated user email and token
  ngOnInit() {
    console.log('Hello from ClientProfileComponent::OnInit');
    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();
    this.getClientFromServerResponse();

  }


  canDeactivate(): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no Client detail or the Client is unchanged
    if ( !this.client
      || (this.client.firstName === this.clientFirstNameForUpdate
      && this.client.lastName === this.clientLastNameForUpdate
      && this.client.birthDate === this.clientBirthDateForUpdate
      && this.client.gender === this.clientGenderForUpdate)
    ) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Έχετε αλλάξει κάποια στοιχεία.Θέλετε να συνεχίσετε χωρίς να σώσετε τις αλλαγές?');
  }


  private getClientFromServerResponse() {
    console.log('Hello from ClientProfileComponent::getClientFromServerResponse()');
    // check if clientEmail as retrieved from localStorage is present for the request
    if (this.clientProfileService.parameterIsNull(this.authenticatedUser.getEmail()) === true){
      this.notification = new ErrorNotification();
      this.notification.setMessage('Κάποιο πρόβλημα προέκυψε με το αίτημα σας. Αν το πρόβλημα παραμένει παρακαλούμε αποσυνδεθείτε και συνδεθείτε ξανά!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }

    // Call the service and get the Observable Response
    this.clientProfileService.getClientProfile(this.authenticatedUser.getEmail())
      .subscribe(
        clientObjectFromResponse => {

          this.clientFirstNameForUpdate = clientObjectFromResponse.firstName;
          this.clientLastNameForUpdate = clientObjectFromResponse.lastName;
          this.clientBirthDateForUpdate = clientObjectFromResponse.birthDate;
          this.clientGenderForUpdate = clientObjectFromResponse.gender;

          this.client = clientObjectFromResponse;
        },
        error =>  {
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


  public onClientProfileUpdate() {

    console.log('HELLO FROM ClientProfileComponent::updateClientProfile');

    this.client.firstName = this.clientFirstNameForUpdate;
    this.client.lastName = this.clientLastNameForUpdate;
    this.client.birthDate = this.clientBirthDateForUpdate;
    this.client.gender = this.clientGenderForUpdate;

    if (this.authService.isUserAuthenticated() !== true) {
      this.notification = new ErrorNotification();
      this.notification.setMessage('Η συνεδρία σας έληξε. Παρακαλούμε συνδεθείτε ξανά!');
      this.notificationService.updateNotificationData(this.notification);
      this.router.navigateByUrl('/auth');

      return;
    }
    this.clientProfileService.updateClientProfile(this.client)
      .subscribe(
        success => {

          this.notification = new SuccessNotification();
          this.notification.setMessage('Τα στοιχεία σου ενημερώθηκαν με επιτυχία!');
          this.notificationService.updateNotificationData(this.notification);

          this.router.navigateByUrl('/account');
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

}

