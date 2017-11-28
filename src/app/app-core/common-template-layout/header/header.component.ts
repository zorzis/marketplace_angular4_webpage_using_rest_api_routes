import {Component} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {AuthenticatedUser} from "../../../auth/model/authenticated-user.model";

@Component({
  selector: 'header-selector',
  templateUrl: './header.component.html',
})



export class HeaderComponent {
  private authUser: AuthenticatedUser;


  constructor( private authService: AuthService) {

    console.log('Hello from HeaderComponent::Constructor');
    this.authUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();
    this.authUser.printAuthenticatedUserDetails();

  }

}

