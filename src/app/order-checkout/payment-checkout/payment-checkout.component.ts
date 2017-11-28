import {Component, OnDestroy, OnInit} from "@angular/core";
import {ShopingCart} from "../../model/shoping-cart.model";
import {Subscription} from "rxjs/Subscription";
import {AbstractNotification} from "../../notifications/notificationModelAbstract.model";
import {NotificationService} from "../../notifications/notificationsSharedService.service";
import {Router} from "@angular/router";
import {ShopingCartService} from "../../shoping-cart-shared-service.service";
import {AuthService} from "../../auth/auth.service";
import {AuthenticatedUser} from "../../auth/model/authenticated-user.model";
import {PaymentMethod} from "../../model/payment-method.model";
import {PaypalOrderCreateService} from "./paypal-payment/paypal-order-create-service.service";
import {InfoNotification} from "../../notifications/notificationModelInfo.model";
import {ErrorNotification} from "../../notifications/notificationModelError.model";
import {ShoppingCartDTO} from "../../model/shopping-cart-for-order-request.model";
import {PaypalPaymentIDResponseDTO} from "../../model/paypal-payment-server-response.model";


@Component({
  selector: 'payment-checkout-selector',
  templateUrl: './payment-checkout.component.html',

})


export class PaymentCheckoutComponent implements OnInit, OnDestroy {

  private cart: ShopingCart;
  private shoppingCartSharedServiceObservable: Subscription;
  private cartItemsCounter: number;
  private notification: AbstractNotification;
  private authenticatedUser: AuthenticatedUser;

  private chosenPaymentMethodToProcedeOrderCheckout: PaymentMethod;

  private dataToCreateOrder: ShoppingCartDTO;

  private booleanPaypalPaymentApproval: boolean = false;

  private booleanOnDeliveryPaymentApproval: boolean = false;

  private booleanIsButtonCreateOrderPressed: boolean = false;

  private shoppingCartFromResponse: ShoppingCartDTO;

  private shoppingCartID: string;

  constructor(private authService: AuthService,
              private shopingCartSharedService: ShopingCartService,
              private router: Router,
              private notificationService: NotificationService,
              private paypalOrderCreateService: PaypalOrderCreateService) {

    console.log('Hello From PaymentCheckoutComponent::CONSTRUCTOR');
    this.cart = this.shopingCartSharedService.getShoppingCartFromMemory();
  }



  ngOnInit(): void {
    console.log('Hi There From PaymentCheckoutComponent::OnInit');
    this.getShoppingCartFromSharedService();
    this.cartItemsCounter = this.shopingCartSharedService.countCartItems();

    if(!this.cart) {
      this.router.navigateByUrl("/");
    }
    if(this.shopingCartSharedService.isCartEmpty()) {
      this.router.navigateByUrl("/");
    }


    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();

    this.chosenPaymentMethodToProcedeOrderCheckout = new PaymentMethod();

    // we remove any payment method or shipping address assigned to cart

    this.shopingCartSharedService.deletePaymentMethod();
  }


  ngOnDestroy(): void {
    console.log('Hi There From PaymentCheckoutComponent::OnDestroy');
    this.shoppingCartSharedServiceObservable.unsubscribe();
  }


  private getShoppingCartFromSharedService(): void {
    console.log('Hi From PaymentCheckoutComponent::getShoppingCartFromSharedService()');
    const sharedServiceObservable = this.shopingCartSharedService.getShoppingCartObservable();
    this.shoppingCartSharedServiceObservable = sharedServiceObservable
      .subscribe(
        cartFromSharedService => {
          this.cart = <ShopingCart>cartFromSharedService;
          this.cartItemsCounter = this.shopingCartSharedService.countCartItems();
        });
  }


  private onChoosePaymentMethodForOrder(chosenPaymentMethodForOrder: PaymentMethod) {
    this.chosenPaymentMethodToProcedeOrderCheckout = chosenPaymentMethodForOrder;
    this.shopingCartSharedService.addPaymentMethodToCart(chosenPaymentMethodForOrder);
  }

  private checkIfPaymentIsSelectedForSelectPaymentButtons(paymentMethod: PaymentMethod): boolean {
    if ((this.chosenPaymentMethodToProcedeOrderCheckout.paymentMethodID === paymentMethod.paymentMethodID) || (this.booleanIsButtonCreateOrderPressed)) {
      return true;
    }
    return false;
  }



  private checkIfPaymentIsSelectedForAlert(paymentMethod: PaymentMethod): boolean {
    if (this.chosenPaymentMethodToProcedeOrderCheckout.paymentMethodID === paymentMethod.paymentMethodID) {
      return true;
    }
    return false;
  }


  private checkForSelectedPaymentMethod(): boolean {
    if(this.chosenPaymentMethodToProcedeOrderCheckout.paymentMethodID) {
      return true;
    }
    return false;
  }



  private onCreatePaypalOrder(): void {

    this.paypalOrderCreateService.onCreateNewOrderForPaypalPayment(this.dataToCreateOrder)
      .subscribe(
        success => {
          this.shoppingCartFromResponse = success;

          if(this.shoppingCartFromResponse) {

            this.notification = new InfoNotification();
            this.notification.setMessage('Τα στοιχεία της παραγγελίας επιβεβαιώθησαν βεβαίως βεβαίως! Μπορείτε να προχωρήσετε στην πληρωμή της παραγγελίας!!');
            this.notificationService.updateNotificationData(this.notification);

            this.shoppingCartID = this.shoppingCartFromResponse.shoppingCartID;
            this.booleanPaypalPaymentApproval = true;
          }
        },
        error => {
          this.booleanPaypalPaymentApproval = false;

          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);
          }

          this.notificationService.updateNotificationData(this.notification);
        }
      );
  }

  private onCreateOnDeliveryOrder(): void {
    this.booleanOnDeliveryPaymentApproval = true;
  }



  private isOk2ShowPaypalPaymentProcessScreen(): boolean {
    if((this.booleanPaypalPaymentApproval === true) && this.cart.paymentMethod.paymentMethodID === 'paypal') {
      return true;
    } else {
      return false;
    }
  }

  private isOk2ShowOnDeliveryPaymentProcessScreen(): boolean {
    if((this.booleanOnDeliveryPaymentApproval === true ) && this.cart.paymentMethod.paymentMethodID === 'onDelivery') {
      return true;
    } else {
      return false;
    }
  }

  private isOkToShowMainScreen(): boolean {
    if(!this.isOk2ShowOnDeliveryPaymentProcessScreen() && !this.isOk2ShowPaypalPaymentProcessScreen()) {
      return true;
    }
    else {
      return false;
    }
  }
  

  private onCreateOrder(): void {

    // init the data to send to service for the REST API Request
    this.dataToCreateOrder = new ShoppingCartDTO(
      this.authenticatedUser.email,
      this.cart.shopingCartProducerOwnsTheProducts.producerID,
      this.cart.shipingAddress.id,
      this.cart.paymentMethod.paymentMethodID,
      this.cart.shopingCartItems);

    // prevent any button of the payment method to interact with the process if pressed again
    this.booleanIsButtonCreateOrderPressed = true;

    if(this.cart.paymentMethod.paymentMethodID === 'paypal') {
      this.booleanOnDeliveryPaymentApproval = false;
      return this.onCreatePaypalOrder();

    } else if(this.cart.paymentMethod.paymentMethodID === 'onDelivery') {
      this.booleanPaypalPaymentApproval = false;
      return this.onCreateOnDeliveryOrder();
    }
  }
}




