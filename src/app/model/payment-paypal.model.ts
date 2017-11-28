import {Payment} from "./payment.model";

export class PaymentPaypal extends Payment {

  public paypalTransactionNo: string;
  public paypalApprovalPaymentID: string;

}
