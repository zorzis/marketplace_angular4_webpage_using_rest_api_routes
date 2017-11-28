export class OrderProducerDetails {

  public producerID: string;

  public orderProducerFirstName: string;

  public orderProducerLastName: string;

  public orderProducerEmail: string;

  public orderProducerGender: string;

  public orderProducerBirthDate: string;


  public printOrerProducerDetails(): void {
    console.log('------Order Producer Details------');
    console.log('producerID: ' + this.producerID);
    console.log('orderProducerFirstName: ' + this.orderProducerFirstName);
    console.log('orderProducerLastName: ' + this.orderProducerLastName);
    console.log('orderProducerEmail: ' + this.orderProducerEmail);
    console.log('orderProducerGender: ' + this.orderProducerGender);
    console.log('orderProducerBirthDate: ' + this.orderProducerBirthDate);
  }
}
