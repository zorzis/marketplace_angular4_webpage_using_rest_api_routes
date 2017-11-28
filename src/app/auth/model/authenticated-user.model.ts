export class AuthenticatedUser {
  public email: string;
  public accessToken: string;
  public clientID: string;
  public is_account_enabled: boolean;
  public firstName: string;
  public lastName: string;

  constructor(email?: string, accessToken?: string) {
    this.email = email;
    this.accessToken = accessToken;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
  }
  public getEmail(): string {
    return this.email;
  }


  public setEmail(email: string): void {
    this.email = email;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  public getClientID(): string {
    return this.clientID;
  }

  public setClientID(clientID: string) {
    this.clientID = clientID;
  }


  public getIsAccountEnabled() {
    return this.is_account_enabled;
  }

  public setIsAccountEnabled(is_account_enabled: boolean) {
    this.is_account_enabled = is_account_enabled;
  }

  public printAuthenticatedUserDetails(): void {
    console.log('---Authenticated Client Details Follow---');
    console.log('Email: ' + this.email);
    console.log('ClientID: ' + this.clientID);
    console.log('First Name: ' + this.firstName);
    console.log('Last Name: ' + this.lastName);
    console.log('Is Account Enabled: ' + this.is_account_enabled);
  }
}
