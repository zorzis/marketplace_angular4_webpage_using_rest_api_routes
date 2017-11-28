import {PaymentRefund} from "./payment-refund.model";
export class PaymentDeposit {
  public paymentDepositID: string;
  public status: string;
  public processorMessage: string;
  public ammount: string;
  public createdAt: string;
  public updatedAt: string;
  public paymentRefund: PaymentRefund;
}
