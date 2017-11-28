import {Component, OnInit} from '@angular/core';
import { AuthService } from './auth.service';
import { Credentials } from './model/credentials.model';
import { ErrorNotification } from '../notifications/notificationModelError.model';
import { AuthenticatedUser } from './model/authenticated-user.model';
import { SuccessNotification } from '../notifications/notificationModelSuccess.model';
import { NotificationService } from '../notifications/notificationsSharedService.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'auth-module',
  templateUrl: './auth.component.html',
})


export class AuthComponent implements OnInit {

  private returnUrl: string;
  private credentials: Credentials;
  private authenticatedUser: AuthenticatedUser;
  private notification: any;

  constructor(private authService: AuthService,
              private  notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router) {

    console.log('Hello from auth.component::constructor');
  }



  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // if user is currently isUserAuthenticated redirect user from authentication page
    if(this.authService.isUserAuthenticated()) {
      // login successful so redirect to return url
      this.router.navigate([this.returnUrl]);

    }

  }


  public onLogin(producerEmailToBeAuthenticated: string, producerPasswordToBeAuthenticated: string) {

    console.log('HELLO FROM auth.component::doAuth');

    this.credentials = new Credentials(producerEmailToBeAuthenticated, producerPasswordToBeAuthenticated);

    // checks for not null, if null throw error
    if (this.authService.checkNotNull(this.credentials.getEmail()) === true ) {

      this.notification = new ErrorNotification();
      this.notification.setMessage('Συμπληρώστε το Email σας!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }

    if (this.authService.checkNotNull(this.credentials.getPassword()) === true) {

      this.notification = new ErrorNotification();
      this.notification.setMessage('Συμπληρώστε το password!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }

    // Call the service and get the Observable Response
    this.authService.doAuth(this.credentials)
      .subscribe(
        authenticatedUserFromRequestParsingToken => {

          this.authenticatedUser = authenticatedUserFromRequestParsingToken;

          // we save the token to the localstorage
          this.authService.saveAuthenticatedUserToLocalStorage(this.credentials.email, this.authenticatedUser.accessToken);

          this.notification = new SuccessNotification();
          this.notification.setMessage('Καλώς ήρθες '
            + this.authService.retrieveAuthenticatedUserFromLocalStorage().getEmail()
            + ' στο haze.gr!');

          this.notificationService.updateNotificationData(this.notification);

          // login successful so redirect to return url
          this.router.navigate([this.returnUrl]);


        },
        error =>  {

          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));

          console.log('Access Token ErrorNotification::message created from error response is: ' + this.notification.message);

          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);

          }

          this.notificationService.updateNotificationData(this.notification);

        }
      );
  }
}
