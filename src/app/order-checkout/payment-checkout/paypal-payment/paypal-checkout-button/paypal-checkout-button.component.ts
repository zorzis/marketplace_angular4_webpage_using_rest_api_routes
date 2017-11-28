import {Component, Input, OnInit} from "@angular/core";
import {paypal} from "./paypal-checkout-button.module";
import {AuthenticatedUser} from "../../../../auth/model/authenticated-user.model";
import {AuthService} from "../../../../auth/auth.service";
import {DialogService} from "../../../../dialog.service";
import {SuccessNotification} from "../../../../notifications/notificationModelSuccess.model";
import {NotificationService} from "../../../../notifications/notificationsSharedService.service";
import {Router} from "@angular/router";
import {ErrorNotification} from "../../../../notifications/notificationModelError.model";
import {ShopingCartService} from "../../../../shoping-cart-shared-service.service";
import {Order} from "../../../../model/order.model";

@Component({
  selector: 'paypal-checkout-button',
  templateUrl: 'paypal-checkout-button.component.html'
})

// We do the Server Side REST
// Server Side Express Checkout using REST
// Create a PayPal Checkout button and accept payments,
// by calling the PayPal REST API from your server.

// https://github.com/paypal/paypal-checkout/issues/368
// https://github.com/paypal/paypal-checkout/issues/480
export class PaypalCheckoutButtonComponent implements OnInit {

  private authenticatedUser: AuthenticatedUser;
  private notification: any;
  private orderFromServerSuccessResponce: Order;

  // from previous angular comp
  @Input()
  private shoppingCartID: string;

  // sandbox | production
  @Input()
  private env = 'sandbox';

  // Show the buyer a 'Pay Now' button in the checkout flow
  @Input()
  private commit = false;

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router,
              private shoppingCartService: ShopingCartService) {

    console.log('Hello From PaypalCheckoutButtonComponent ::CONSTRUCTOR');

    // We use that trick so we can handle params with 'this'
    // inside static Paypal Client checkout.js functions
    this.payment = this.payment.bind(this);
    this.onAuthorize = this.onAuthorize.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onError = this.onError.bind(this);

  }


  ngOnInit(): void {
    console.log('Hi There From PaypalCheckoutButtonComponent::OnInit');

    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();
    console.log("PaypalCheckoutButtonComponent::Shopping Cart From API Response received from previous controller is: " + this.shoppingCartID);
  }

  ngOnDestroy(): void {
    console.log('Hi There From PaypalCheckoutButtonComponent::OnDestroy');
  }

  private payment() {
    // We call the Server with a shoppingCartID in order to achieve our server to find
    // the previous step stored shopping cart and transform shopping cart onto an Order data
    // and also create the Paypal Payment Object to be retrieved from our server,
    // and we assume if all done ok return a PaymentID that paypal gonna use for the next step of execution
    var CREATE_URL: string = 'http://localhost:9090/client/payment-checkout/paypal/create/' + this.shoppingCartID;

    console.log("PaypalButton::URL TO CHECK IS: " + CREATE_URL);


    // Make a call to your server to set up the payment
    return paypal.request.post(CREATE_URL)
      .then(success => {
        return success.paymentID;
      })
      .catch(error => {
        console.log('The payment had ERROR::onCreate Payment!', error);
        this.notification = new ErrorNotification();
        this.notification.setMessage('Σφάλμα κατά την πληρωμή της παραγγελίας μέσω Paypal!');
        this.notificationService.updateNotificationData(this.notification);
        return this.router.navigateByUrl('/order');
      });
  }



  private onAuthorize(data, actions) {
    var EXECUTE_URL = 'http://localhost:9090/client/payment-checkout/paypal/execute';

    var dataFromNG: DataFromNG = new DataFromNG(data);

    console.log("Hello from onAuthorize Before Request::Authorized: ", this, dataFromNG, actions);

    return paypal.request.post(EXECUTE_URL, dataFromNG)
      .then(success => {
         console.log("Hello from onAuthorize::console log: this, actions, success !", this, actions, success);

         this.shoppingCartService.clearCart();

         this.notification = new SuccessNotification();
         this.notification.setMessage('Η παραγγελία σου ολοκληρώθηκε με επιτυχία και αποπληρώθηκε μέσω Paypal!');
         this.notificationService.updateNotificationData(this.notification);

         this.orderFromServerSuccessResponce = success;

         // use that way to redirect to custom url or do whatever we want
         return this.router.navigate(['/account/orders', this.orderFromServerSuccessResponce.orderID]);

      })
      .catch(error => {

        console.log('The payment had ERROR::onAuthorize!', error);
        this.notification = new ErrorNotification();
        this.notification.setMessage('Σφάλμα κατά την πληρωμή της παραγγελίας μέσω Paypal!');
        this.notificationService.updateNotificationData(this.notification);
        return this.router.navigateByUrl('/order');

      });
  }


  private onCancel(data, actions) {
    console.log("Hello from onCancel::console log this, actions !", this, actions);

    console.log('The payment was cancelled!');
    console.log('Payment ID = ', data.paymentID);
  }

  private onError(err) {
    console.log("Hello from onError::console log this, actions !", this, err);

    console.log('The payment FAILED!');
    console.log('Error is = ', err);

    this.notification = new ErrorNotification();
    this.notification.setMessage('Σφάλμα κατά την πληρωμή της παραγγελίας μέσω Paypal!');
    this.notificationService.updateNotificationData(this.notification);
    return this.router.navigateByUrl('/account');

  }

}



// Set up the data you need to pass to your server
export class DataFromNG {
  paymentID: any;
  payerID: any;

  constructor(data:any) {
    this.paymentID = data.paymentID;
    this.payerID = data.payerID;
  }
}
