import {PaymentMethod} from "./payment-method.model";
import {PaymentApproval} from "app/model/payment-approval.model";

export abstract class Payment {

 public paymentID: string;
 public paymentMethod: PaymentMethod;
 public createdAt: string;
 public updatedAt: string;
 public paymentApproval: PaymentApproval;

}
