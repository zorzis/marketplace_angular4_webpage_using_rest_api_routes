import {Component, OnDestroy, OnInit} from "@angular/core";
import {ShopingCart} from "../../../model/shoping-cart.model";
import {Subscription} from "rxjs/Subscription";
import {AbstractNotification} from "../../../notifications/notificationModelAbstract.model";
import {AuthenticatedUser} from "../../../auth/model/authenticated-user.model";
import {AuthService} from "../../../auth/auth.service";
import {ShopingCartService} from "../../../shoping-cart-shared-service.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../notifications/notificationsSharedService.service";
import {ErrorNotification} from "../../../notifications/notificationModelError.model";
import {ShoppingCartDTO} from "../../../model/shopping-cart-for-order-request.model";
import {CashOnDeliveryOrderCreateService} from "./cash-on-delivery-order-create-service.service";
import {SuccessNotification} from "../../../notifications/notificationModelSuccess.model";
import {Order} from "../../../model/order.model";

@Component({
  selector: 'cash-on-delivery-pay-order-component',
  templateUrl: 'cash-on-delivery-pay-order.component.html'
})


export class CashOnDeliveryPayOrderComponent implements OnInit, OnDestroy {

  private cart: ShopingCart;
  private shoppingCartSharedServiceObservable: Subscription;
  private cartItemsCounter: number;
  private notification: AbstractNotification;
  private authenticatedUser: AuthenticatedUser;

  private dataToCreateOrder: ShoppingCartDTO;

  private orderFromServerSuccessResponce: Order;

  constructor(private authService: AuthService,
              private shopingCartSharedService: ShopingCartService,
              private router: Router,
              private notificationService: NotificationService,
              private cashOnDeliveryCreateOrderService: CashOnDeliveryOrderCreateService,
              private shoppingCartService: ShopingCartService) {

    console.log('Hello From CashOnDeliveryPayOrderComponent::CONSTRUCTOR');
    this.cart = shopingCartSharedService.getShoppingCartFromMemory();

  }

  ngOnInit(): void {
    console.log('Hi There From CashOnDeliveryPayOrderComponent::OnInit');
    this.getShoppingCartFromSharedService();
    this.cartItemsCounter = this.shopingCartSharedService.countCartItems();

    if (this.shopingCartSharedService.isCartEmpty() === true) {
      this.router.navigateByUrl("/");
    }

    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();
  }



  ngOnDestroy(): void {
    console.log('Hi There From CashOnDeliveryPayOrderComponent::OnDestroy');
    this.shoppingCartSharedServiceObservable.unsubscribe();

  }

  private getShoppingCartFromSharedService(): void {
    console.log('Hi From CashOnDeliveryPayOrderComponent::getShoppingCartFromSharedService()');
    const sharedServiceObservable = this.shopingCartSharedService.getShoppingCartObservable();
    this.shoppingCartSharedServiceObservable = sharedServiceObservable
      .subscribe(
        cartFromSharedService => {
          this.cart = <ShopingCart>cartFromSharedService;
          this.cartItemsCounter = this.shopingCartSharedService.countCartItems();

          if(!(this.cart.paymentMethod.paymentMethodID === 'onDelivery')) {
            this.notification = new ErrorNotification();
            this.notification.setMessage('Δε μπορείτε να ολοκληρώσετε την παραγγελία.Η μέθοδος πληρωμής δεν είναι [onDelivery]');

            this.notificationService.updateNotificationData(this.notification);
            this.router.navigateByUrl("/");
          }
        });
  }

  private onCreateCashOnDeliveryOrder(): void {
    // init the data to send to service for the REST API Request
    this.dataToCreateOrder = new ShoppingCartDTO(
      this.authenticatedUser.email,
      this.cart.shopingCartProducerOwnsTheProducts.producerID,
      this.cart.shipingAddress.id,
      this.cart.paymentMethod.paymentMethodID,
      this.cart.shopingCartItems);

    
    this.cashOnDeliveryCreateOrderService.onCreateNewOrderForCashOnDeliveryPayment(this.dataToCreateOrder)
      .subscribe(
        success => {

          this.orderFromServerSuccessResponce = success;

          this.shoppingCartService.clearCart();

          this.notification = new SuccessNotification();
          this.notification.setMessage('Η παραγγελία σου ολοκληρώθηκε με επιτυχία και θα αποπληρωθεί κατά την παραλαβή από την Courier!');
          this.notificationService.updateNotificationData(this.notification);
          
          // use that way to redirect to custom url or do whatever we want
          return this.router.navigate(['/account/orders', this.orderFromServerSuccessResponce.orderID]);
        },
        error => {
          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);
          }
          this.notificationService.updateNotificationData(this.notification);
        }
      );
  }

}


