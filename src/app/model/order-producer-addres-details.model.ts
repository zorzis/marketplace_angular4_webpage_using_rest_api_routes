export class OrderProducerAddressDetails {

  public producerID: string;

  public street: string;

  public streetNumber: string;

  public city: string;

  public postalCode: string;

  public state: string;

  public country: string;

  public latitude: string;

  public longitude: string;

  public floor: string;

  public printOrerProducerAddressDetails(): void {
    console.log('------Order Producer Address Details------');
    console.log('producerID: ' + this.producerID);
    console.log('street: ' + this.street);
    console.log('streetNumber: ' + this.streetNumber);
    console.log('city: ' + this.city);
    console.log('postalCode: ' + this.postalCode);
    console.log('state: ' + this.state);
    console.log('country: ' + this.country);
    console.log('latitude: ' + this.latitude);
    console.log('longitude: ' + this.longitude);
    console.log('floor: ' + this.floor);
  }

}
