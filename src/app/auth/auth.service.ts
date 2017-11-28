import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {AuthenticatedUser} from './model/authenticated-user.model';
import {Credentials} from './model/credentials.model';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import {ShopingCartService} from "../shoping-cart-shared-service.service";


@Injectable()
export class AuthService {
  // URL to REST API
  private authURL = 'http://localhost:9090/client/auth/';

  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http,
              private router: Router,
              private shopingCartSharedService: ShopingCartService) {

    console.log('Hello from AuthService::constructor');

    if (this.isUserAuthenticated()) {
      console.log('Authenticated user is: ' + this.retrieveAuthenticatedUserFromLocalStorage().email);
    }
    else {
      console.log('No user is currently logged in');
    }
  }

  // user fills the email and password, and if success a Signed JWT token is provided
  doAuth(credentials: Credentials): Observable<AuthenticatedUser> {
    console.log(`Hello from auth.service::doAuth`);
    console.log(`User email: [ ${ credentials.getEmail() } ]`);
    console.log(`User password: [ ${ credentials.password } ]`);



    // set the request parameters to be send
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', credentials.getEmail());
    urlSearchParams.append('password', credentials.getPassword());
    const paramsBody = urlSearchParams.toString();

    // set the headers of the request locally
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.authURL, paramsBody, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();


    console.log(`Successfull Response from Server ==>`);
    console.log(body);

    return body || {};
  }



  private handleError(error: Response | any) {


    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;

    if (error instanceof Response) {
      console.log('Error is instanceOf Response');

      const body = error.json() || '';
      console.log('Error transformation using "error.json()" is: ' + body.toString());


      let err: any;

      if (body.error) {
        err = body.error;
        console.log('Error transformation using "body.error" is: ' + err.toString());
        errMsg = `${error.status} - ${error.statusText || ''}  ==>  ${err}`;

      } else if (error.status === 0) {
        const strangeError = {
            'status': error.status,
            'message': 'Η σύνδεση με τον διακομιστή δεν είναι δυνατή αυτή τη στιγμή. Παρακαλούμε προσπαθήστε σε λίγο!'
          };
        err = JSON.stringify(strangeError);
        errMsg = err;


      } else {
        err = JSON.stringify(body);
        console.log('Error transformation using "JSON.stringify(body)" is: ' + err.toString());
        console.log(`Full error log is: error.status[ ${error.status} ], error.statusText[ ${error.statusText || ''} ]`);

        errMsg = err;

      }
    } else {
      console.log('Following error is NOT an instanceof Response');

      if (error.message) {
        errMsg = error.message;
      } else {
        errMsg = error.toString();
      }

    }

    console.error(errMsg);

    return Observable.throw(errMsg);


  }


  public checkNotNull(someValue: any) {
    console.log('Hello from auth.service::parameterIsNull');

    if (!someValue || someValue.length === 0 || someValue === null) {
      const errorToBeThrown = 'Parameter provided Cannot be null';

      console.error('Error produced is: ' + errorToBeThrown);

      return true;

    } else {

      console.log('[ ' + someValue + ' ] is not null');

      return false;
    }
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    this.removeUserCredentialsFromLocalStorage();

    // Clear the cart if exists
    // clears both inMemory and LocalStorage
    this.shopingCartSharedService.clearCart();

    // Send the user back to auth after logout
    this.router.navigateByUrl('/');
  }

  private removeUserCredentialsFromLocalStorage(): void {

    localStorage.removeItem('current_user_email');
    localStorage.removeItem('current_user_clientID');
    localStorage.removeItem('current_user_is_account_enabled');
    localStorage.removeItem('current_user_first_name');
    localStorage.removeItem('current_user_last_name');
    localStorage.removeItem('access_token');
  }

  // check if user is currently logged in by checking local storage for accessToken object(jwt)
  public isUserAuthenticated(): boolean {

    //  This function simply checks the expiry date of the JWT and returns true if it is not expired.
    if (tokenNotExpired('access_token')
      && this.checkIfLocalStorageCurrentUserAndAccessTokenArePresent()) {
      return true;
    }
    else {
      this.removeUserCredentialsFromLocalStorage();
      return false;
    }
  }


  public saveAuthenticatedUserToLocalStorage(email: string, accessToken: string) {


    //localStorage.clear();
    this.removeUserCredentialsFromLocalStorage();

    // store username and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('current_user_email', email);
    localStorage.setItem('access_token', accessToken);
    if (this.jwtHelperDecodeToken().hasOwnProperty('clientID')) {
      localStorage.setItem('current_user_clientID', this.jwtHelperDecodeToken().clientID);
    }
    if (this.jwtHelperDecodeToken().hasOwnProperty('is_account_enabled')) {
      localStorage.setItem('current_user_is_account_enabled', this.jwtHelperDecodeToken().is_account_enabled);
    }
    if (this.jwtHelperDecodeToken().hasOwnProperty('first_name')) {
      localStorage.setItem('current_user_first_name', this.jwtHelperDecodeToken().first_name);
    }
    if (this.jwtHelperDecodeToken().hasOwnProperty('last_name')) {
      localStorage.setItem('current_user_last_name', this.jwtHelperDecodeToken().last_name);
    }
  }


  public retrieveAuthenticatedUserFromLocalStorage() {

      let authenticatedUser: AuthenticatedUser = new AuthenticatedUser();
      authenticatedUser.email = localStorage.getItem('current_user_email');
      authenticatedUser.clientID = localStorage.getItem('current_user_clientID');

      let is_account_enabled: string;
      is_account_enabled = localStorage.getItem('current_user_is_account_enabled');
      authenticatedUser.is_account_enabled = JSON.parse(is_account_enabled);

      authenticatedUser.firstName = localStorage.getItem('current_user_first_name');

      authenticatedUser.lastName = localStorage.getItem('current_user_last_name');
      authenticatedUser.accessToken = localStorage.getItem('access_token');

      return authenticatedUser;
  }



  private checkIfLocalStorageCurrentUserAndAccessTokenArePresent() {
    if (localStorage.getItem('access_token')

      && localStorage.getItem('current_user_email')

      && localStorage.getItem('current_user_clientID')) {

      return true;
    }
  }

  public jwtHelperDecodeToken() {
    if (localStorage.getItem('access_token') && localStorage.getItem('access_token') !== null) {
      const token = localStorage.getItem('access_token');
      let tokenPayload = this.jwtHelper.decodeToken(token);

      // console.log('Decoded Token is: ' + JSON.stringify(tokenPayload));
      return tokenPayload;
    }
    return null;
  }

  public jwtHelperCheckExpDate() {
    if (localStorage.getItem('access_token')) {

      const token = localStorage.getItem('access_token');

      console.log('Hello from auth.service::jwtHelperCheckExpDate');
      console.log('Token Expiration Date is: ' + this.jwtHelper.getTokenExpirationDate(token));
      return this.jwtHelper.getTokenExpirationDate(token);
    }
    return null;
  }


}

