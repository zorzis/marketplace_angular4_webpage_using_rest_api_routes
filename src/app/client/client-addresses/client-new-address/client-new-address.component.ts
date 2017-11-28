import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {AuthenticatedUser} from "../../../auth/model/authenticated-user.model";
import {Client} from "../../../model/client.model";


@Component({
  selector: 'client-new-address-selector',
  templateUrl: './client-new-address.component.html',
  styleUrls: ['./client-new-address.component.css'],
})

export class ClientNewAddressComponent implements OnInit {

  private authenticatedUser: AuthenticatedUser;
  private client: Client;



  constructor(private authService: AuthService,) {

  }

  ngOnInit() {
    console.log('Hello from ClientNewAddressComponent::OnInit');
    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();

    // init the client object
    this.client = new Client();
    this.client.email = this.authenticatedUser.email;
  }


}


