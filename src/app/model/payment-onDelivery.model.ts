import {Payment} from "./payment.model";

export class PaymentOnDelivery extends Payment {

  public isDeliveryPaid: boolean;
  public deliveryPaidAt: string;
}
