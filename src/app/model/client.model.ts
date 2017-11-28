export class Client {

  public email: string;
  public clientID: string;
  public firstName: string;
  public lastName: string;
  public birthDate: string;
  public gender: string;



  constructor(email?: string) {
    this.email = email;
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

  public getClientID(): string {
    return this.clientID;
  }

  public setClientID(clientID: string) {
    this.clientID = clientID;
  }


  public getBirthDate(): String {
    return this.birthDate;
  }


  public setBirthDateFromString(birthDate: string): void {
    this.birthDate = birthDate;
  }

  public getGender(): string {
    return this.gender;
  }

  public setGender(gender: string): void {
    this.gender = gender;
  }

  public printClientObjectDetails(): void {
    console.log('---Client Object Details Follow---');
    console.log('Email: ' + this.email);
    console.log('ClientID: ' + this.clientID);
    console.log('First Name: ' + this.firstName);
    console.log('Last Name: ' + this.lastName);
    console.log('Birth Date: ' + this.birthDate);
    console.log('Gender: ' + this.gender);

  }
}
