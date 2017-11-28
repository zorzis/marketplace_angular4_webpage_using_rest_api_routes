import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ShopingCart} from "../../../model/shoping-cart.model";
import {Subscription} from "rxjs/Subscription";
import {AbstractNotification} from "../../../notifications/notificationModelAbstract.model";
import {AuthenticatedUser} from "../../../auth/model/authenticated-user.model";
import {AuthService} from "../../../auth/auth.service";
import {ShopingCartService} from "../../../shoping-cart-shared-service.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../notifications/notificationsSharedService.service";
import {PaypalOrderCreateService} from "./paypal-order-create-service.service";
import {ShoppingCartItem} from "../../../model/shoping-cart-item.model";
import {SuccessNotification} from "../../../notifications/notificationModelSuccess.model";
import {ErrorNotification} from "../../../notifications/notificationModelError.model";
import {InfoNotification} from "../../../notifications/notificationModelInfo.model";

@Component({
  selector: 'paypal-pay-order-component',
  templateUrl: 'paypal-pay-order.component.html'
})


export class PaypalPayOrderComponent implements OnInit, OnDestroy {

  private cart: ShopingCart;
  private shoppingCartSharedServiceObservable: Subscription;
  private cartItemsCounter: number;
  private notification: AbstractNotification;
  private authenticatedUser: AuthenticatedUser;

  @Input()
  private shoppingCartID: string;


  constructor(private authService: AuthService,
              private shopingCartSharedService: ShopingCartService,
              private router: Router,
              private notificationService: NotificationService) {

    console.log('Hello From PaypalPayOrderComponent::CONSTRUCTOR');
    this.cart = shopingCartSharedService.getShoppingCartFromMemory();

  }


  ngOnInit(): void {
    console.log('Hi There From PaypalPayOrderComponent::OnInit');
    this.getShoppingCartFromSharedService();
    this.cartItemsCounter = this.shopingCartSharedService.countCartItems();

    if (this.shopingCartSharedService.isCartEmpty() === true) {
      this.router.navigateByUrl("/");
    }

    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();

    console.log("Shopping Cart From API Response received from previous controller is: " + this.shoppingCartID);
  }



  ngOnDestroy(): void {
    console.log('Hi There From PaypalPayOrderComponent::OnDestroy');
    this.shoppingCartSharedServiceObservable.unsubscribe();

  }

  private getShoppingCartFromSharedService(): void {
    console.log('Hi From PaypalPayOrderComponent::getShoppingCartFromSharedService()');
    const sharedServiceObservable = this.shopingCartSharedService.getShoppingCartObservable();
    this.shoppingCartSharedServiceObservable = sharedServiceObservable
      .subscribe(
        cartFromSharedService => {
          this.cart = <ShopingCart>cartFromSharedService;
          this.cartItemsCounter = this.shopingCartSharedService.countCartItems();

          if(!(this.cart.paymentMethod.paymentMethodID === 'paypal')) {
            this.notification = new ErrorNotification();
            this.notification.setMessage('Δε μπορείτε να ολοκληρώσετε την παραγγελία.Η μέθοδος πληρωμής δεν είναι [paypal]');

            this.notificationService.updateNotificationData(this.notification);
            this.router.navigateByUrl("/");
          }
        });
  }

}


