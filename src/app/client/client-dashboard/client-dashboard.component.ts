import {Component} from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {AuthenticatedUser} from "../../auth/model/authenticated-user.model";

@Component({
  selector: 'client-dashboard-selector',
  templateUrl: './client-dashboard.component.html',
})


export class ClientDashboardComponent {
  private authenticatedUser: AuthenticatedUser;

  constructor( private authService: AuthService) {
    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();
  }
}
