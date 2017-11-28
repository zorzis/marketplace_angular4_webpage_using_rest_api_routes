import {Component, OnInit} from "@angular/core";


import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthenticatedUser} from "../../../auth/model/authenticated-user.model";
import {Order} from "../../../model/order.model";
import {AuthService} from "../../../auth/auth.service";
import {ClientOrderSingleService} from "./client-order-single.service";
import {NotificationService} from "../../../notifications/notificationsSharedService.service";
import {ErrorNotification} from "../../../notifications/notificationModelError.model";
import {Payment} from "../../../model/payment.model";
import {PaymentPaypal} from "../../../model/payment-paypal.model";
import {PaymentOnDelivery} from "../../../model/payment-onDelivery.model";
import {OrderProduct} from "../../../model/order-product.model";



@Component({
  selector: 'client-order-single-selector',
  templateUrl: './client-order-single.component.html',
})

export class ClientOrderSingleComponent implements OnInit {

  private authenticatedUser: AuthenticatedUser;
  private notification: any;
  private order: Order;
  private orderID: string;

  private paymentPaypal:PaymentPaypal;
  private paymentOnDelivery:PaymentOnDelivery;

  constructor( private authService: AuthService,
               private clientOrderSingleService: ClientOrderSingleService,
               private notificationService: NotificationService,
               private router: Router,
               private activatedRoute: ActivatedRoute,) {

  }



  ngOnInit() {
    console.log('Hello from ClientOrderSingleComponent::OnInit');
    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();

    this.activatedRoute.params
    // (+) converts string 'id' to a number
      .subscribe((params: Params) => {
        this.orderID = (params['id']);
        console.log("OrderID from URL ROUTE IS: " + this.orderID);
      });

    this.getClientOrderSingleFromServerResponse();
  }


  private getClientOrderSingleFromServerResponse() {
    console.log('Hello from  ClientOrderSingleComponent::getClientOrderSingleFromServerResponse()');

    // check if clientEmail as retrieved from localStorage is present for the request
    if (this.clientOrderSingleService.parameterIsNull(this.authenticatedUser.getEmail()) === true){
      this.notification = new ErrorNotification();
      this.notification.setMessage('Κάποιο πρόβλημα προέκυψε με το αίτημα σας. Αν το πρόβλημα παραμένει παρακαλούμε αποσυνδεθείτε και συνδεθείτε ξανά!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }


    // Call the service and get the Observable Response
    this.clientOrderSingleService.getClientOrderSingle(this.authenticatedUser.email, this.orderID)
      .subscribe(
        orderFromResponse => {

          let order: Order = orderFromResponse;

          // just a lil hack to inheritance as i can find an "Angular" way to achieve that
          if(order) {
            if(order.orderPayment.paymentMethod.paymentMethodID === "paypal") {
              this.order = order;
              this.paymentPaypal = <PaymentPaypal>order.orderPayment;
              this.order.orderPayment = this.paymentPaypal;
            } else if(order.orderPayment.paymentMethod.paymentMethodID === "onDelivery") {
              this.order = order;
              this.paymentOnDelivery = <PaymentOnDelivery>order.orderPayment;
              this.order.orderPayment = this.paymentOnDelivery;
            }
          }
        },
        error => {
          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          console.log('Unsuccessful request!');
          if(this.notification.status === 404) {
            this.notification.message = 'Η παραγγελία δε βρέθηκε';
          }
          this.notificationService.updateNotificationData(this.notification);
          this.router.navigate(['/account/orders']);
        }
      );
  }


  public isPaymentInstanceOfPaypalPayment(): boolean {
    if(this.order.orderPayment.paymentMethod.paymentMethodID === "paypal") {
      return true;
    }
    else {
      return false;
    }
  }



  public isPaymentInstanceOfOnDeliveryPayment(): boolean {
    if(this.order.orderPayment.paymentMethod.paymentMethodID === "onDelivery") {
      return true;
    }
    else {
      return false;
    }
  }

  public calculateTotalProductPrice(product: OrderProduct): number {

    let total: number;

    total = (product.orderProductQuantity * product.orderProductPrice);

    return total;
  }


  public onClickProducer(producerID: string) {
    this.router.navigate(['/producer', producerID]);
  }

  public formatDateToGreeceTimezone(dateString: string): Date {
    let newDate = new Date(dateString);
    newDate.setHours(newDate.getHours() + 2);
    return newDate;
  }
}
