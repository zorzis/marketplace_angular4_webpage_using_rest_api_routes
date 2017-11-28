import {PaymentDeposit} from "./payment-deposit.model";
export class PaymentApproval {
  public paymentApprovalID: string;
  public status: string;
  public processorMessage: string;
  public ammount: string;
  public createdAt: string;
  public updatedAt: string;
  public paymentDeposit: PaymentDeposit;
}
