import { Component } from '@angular/core';
import {AuthenticatedUser} from "../../../../auth/model/authenticated-user.model";
import {InfoNotification} from "../../../../notifications/notificationModelInfo.model";
import {AuthService} from "../../../../auth/auth.service";
import {NotificationService} from "../../../../notifications/notificationsSharedService.service";

@Component({
  selector: 'header-logged-user-nav-selector',
  templateUrl: './header-logged-user-nav.component.html',
})



export class HeaderLoggedUserNavComponent {
  private notification: any;
  private authenticatedUser: AuthenticatedUser;


  constructor(private authService: AuthService,
              private notificationService: NotificationService) {

    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();

  }

  public logOut() {
    this.notification = new InfoNotification();
    this.notification.setMessage('Αποσυνδεθήκατε με επιτυχία!');

    this.notificationService.updateNotificationData(this.notification);

    this.authService.logout();
  }

}
