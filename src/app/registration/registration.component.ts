import {Component, OnInit} from "@angular/core";
import {RegistrationCredentials} from "./registrationCredentials.model";
import {RegistrationService} from "./registration.service";
import {NotificationService} from "../notifications/notificationsSharedService.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorNotification} from "../notifications/notificationModelError.model";
import {SuccessNotification} from "../notifications/notificationModelSuccess.model";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'registration-selector',
  templateUrl: './registration.component.html',
  providers: [ RegistrationService ],
})


export class RegistrationComponent implements OnInit {

  private returnUrl: string;
  credentials: RegistrationCredentials;
  notification: any;

  constructor(private authService: AuthService,
              private registrationService: RegistrationService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router) {

    console.log('Hello from registration.component::constructor');
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if(this.authService.isUserAuthenticated()) {
      // login successful so redirect to return url
      this.router.navigate([this.returnUrl]);

    }
  }

  public onRegistration(clientEmailToBeRegistered: string,
                        clientPasswordToBeRegistered: string,
                        clientReenteredPasswordToBeChecked: string) {

    console.log('HELLO FROM registration.component::onRegistration');

    this.credentials = new RegistrationCredentials (clientEmailToBeRegistered,
                                                    clientPasswordToBeRegistered);

    // checks for not null, if null throw error
    if (this.registrationService.checkNotNull(this.credentials.getEmail()) === true ) {

      this.notification = new ErrorNotification();
      this.notification.setMessage('Συμπληρώστε το Email σας!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }

    if (this.registrationService.checkNotNull(this.credentials.getPassword()) === true) {

      this.notification = new ErrorNotification();
      this.notification.setMessage('Συμπληρώστε τον κωδικό ασφαλείας!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }

    if (this.registrationService.checkNotNull(clientReenteredPasswordToBeChecked) === true) {

      this.notification = new ErrorNotification();
      this.notification.setMessage('Το πεδίο επιβεβαίωσης συνθηματικού είναι κενό!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }

    // check if passwords are the same
    if (this.registrationService.checkPasswordsInputsAreEquals(this.credentials.getPassword(), clientReenteredPasswordToBeChecked) === false) {

      this.notification = new ErrorNotification();
      this.notification.setMessage('Οι κωδικοί σας δεν είναι όμοιοι!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }

    // Call the service and get the Objectable Response
    this.registrationService.doRegistration(this.credentials)
      .subscribe(
        success => {

          this.notification = Object.assign(new SuccessNotification(), success);

          console.log('SuccessNotification::message created from successful response is: ' + this.notification.message);

          if (this.notification instanceof SuccessNotification) {
            console.log('Notification is type of Success Notification');

          }

          this.notificationService.updateNotificationData(this.notification);

          this.router.navigateByUrl('/auth');

        },
        error =>  {

          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));

          console.log('ErrorNotification::message created from error response is: ' + this.notification.message);

          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);

          }

          this.notificationService.updateNotificationData(this.notification);

        }
      );
  }
}
