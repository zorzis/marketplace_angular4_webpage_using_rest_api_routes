import {PaymentMethod} from "./payment-method.model";
export class ProducerPaymentMethod {
  public paymentMethod: PaymentMethod;
  public isDeactivated: boolean;
  public deactivatedAt: Date;
  public isTerminated: boolean;
  public terminatedAt: Date;
  public createdAt: Date;
  public updatedAt: Date;

  constructor() {

  }
}
