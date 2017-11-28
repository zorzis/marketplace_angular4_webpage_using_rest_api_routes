import {Address} from "./address.model";
import {Spirit} from "./spirit.model";
import {PaymentMethod} from "./payment-method.model";
import {ProducerPaymentMethod} from "./producer-payment-method.model";


export class Producer {


  public email: string;
  public producerID: string;
  public firstName: string;
  public lastName: string;
  public birthDate: string;
  public gender: string;
  public producerAddress: Address;
  public products: Array<Spirit>;
  public producerPaymentMethods: Array<ProducerPaymentMethod>;

  public producerAge: any;


  constructor(email?: string) {
    this.email = email;
  }




  public setAgeFromBirthDate(): void {
    let today = new Date();
    let birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    console.log('Producer BirthDate is: ' + this.birthDate);
    console.log('Today is: ' + today.toString());

    console.log('Producer Age is: ' + this.producerAge);

    this.producerAge = age;
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

  public getProducerID(): string {
    return this.producerID;
  }

  public setProducerID(clientID: string) {
    this.producerID = clientID;
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

  public getProducerAddress(): Address {
    return this.producerAddress;
  }

  public setProducerAddress(address: Address) {
    this.producerAddress = address;
  }

  public getProducts(): Array<Spirit> {
    return this.products;
  }

  public setProducts(spirits: Array<Spirit>): void {
    this.products = spirits;
  }

  public printProducerObjectDetails(): void {
    console.log('---Producer Object Details Follow---');
    console.log('Email: ' + this.email);
    console.log('ProducerID: ' + this.producerID);
    console.log('First Name: ' + this.firstName);
    console.log('Last Name: ' + this.lastName);
    console.log('Birth Date: ' + this.birthDate);
    console.log('Gender: ' + this.gender);

  }
}
