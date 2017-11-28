export class OrderStatusCode {

  public orderStatusCode: string;

  public orderStatusCodeDescription: string;

  public printOrerProductDetails(): void {
    console.log('------Order Status Code Details------');
    console.log('orderStatusCode: ' + this.orderStatusCode);
    console.log('orderStatusCodeDescription: ' + this.orderStatusCodeDescription);
  }
}
