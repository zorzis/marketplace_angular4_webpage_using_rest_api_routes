import {Component} from "@angular/core";
import {AuthService} from "../../../auth/auth.service";
import {AuthenticatedUser} from "../../../auth/model/authenticated-user.model";
import {InfoNotification} from "../../../notifications/notificationModelInfo.model";
import {NotificationService} from "../../../notifications/notificationsSharedService.service";

@Component({
  selector: 'client-profile-avatar-selector',
  templateUrl: './client-profile-avatar.component.html',
})

export class ClientProfileAvatarComponent {
  private authenticatedUser: AuthenticatedUser;
  private notification: any;

  constructor( private authService: AuthService,
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
