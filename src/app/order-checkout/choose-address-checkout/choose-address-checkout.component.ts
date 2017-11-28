import {Component, OnDestroy, OnInit} from "@angular/core";
import {ShopingCartService} from "../../shoping-cart-shared-service.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../notifications/notificationsSharedService.service";
import {ShopingCart} from "../../model/shoping-cart.model";
import {AbstractNotification} from "../../notifications/notificationModelAbstract.model";
import {Subscription} from "rxjs/Subscription";
import {ClientDashboardGetAllClientAddressesService} from "../../client/client-addresses/client-addresses-dashboard/client-addresses-dashboard-get-all-client-addresses-service.service";
import {AuthenticatedUser} from "../../auth/model/authenticated-user.model";
import {Address} from "../../model/address.model";
import {ErrorNotification} from "../../notifications/notificationModelError.model";
import {AuthService} from "../../auth/auth.service";


@Component({
  selector: 'order-cart-checkout-selector',
  templateUrl: './choose-address-checkout.component.html',

})


export class ChooseAddressCheckoutComponent implements OnInit, OnDestroy {



  private cart: ShopingCart;
  private shoppingCartSharedServiceObservable: Subscription;
  private addressSharedServiceObservable: Subscription;

  private cartItemsCounter: number;
  private notification: AbstractNotification;
  private authenticatedUser: AuthenticatedUser;
  private clientAddress: Address;
  private clientAddressesArray: Array<Address>;

  private chosenAddressToProcedeOrderCheckout: Address;

  constructor(private authService: AuthService,
              private shopingCartSharedService: ShopingCartService,
              private clientAddressesDashboardService: ClientDashboardGetAllClientAddressesService,
              private router: Router,
              private notificationService: NotificationService) {

    console.log('Hello From ChooseAddressCheckoutComponent::CONSTRUCTOR');
    this.cart = this.shopingCartSharedService.getShoppingCartFromMemory();
  }




  ngOnInit(): void {
    console.log('Hi There From ChooseAddressCheckoutComponent::OnInit');
    this.getShoppingCartFromSharedService();
    this.cartItemsCounter = this.shopingCartSharedService.countCartItems();

    if(this.shopingCartSharedService.isCartEmpty() === true) {
      this.router.navigateByUrl("/");
    }

    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();
    this.getClientAddressesFromServerResponse();

    this.chosenAddressToProcedeOrderCheckout = new Address();

    // we remove any payment method or shipping address assigned to cart
    this.shopingCartSharedService.deleteAddressAndPaymentMethod();

  }

  ngOnDestroy(): void {
    console.log('Hi There From ChooseAddressCheckoutComponent::OnDestroy');
    this.shoppingCartSharedServiceObservable.unsubscribe();
  }

  private getShoppingCartFromSharedService(): void {
    console.log('Hi From ChooseAddressCheckoutComponent::getShoppingCartFromSharedService()');
    const sharedServiceObservable = this.shopingCartSharedService.getShoppingCartObservable();
    this.shoppingCartSharedServiceObservable = sharedServiceObservable
      .subscribe(
        cartFromSharedService => {
          this.cart = <ShopingCart>cartFromSharedService;
          this.cartItemsCounter = this.shopingCartSharedService.countCartItems();
        });
  }

  private getClientAddressesFromServerResponse() {
    console.log('Hi From ChooseAddressCheckoutComponent::::getClientAddressesFromServerResponse()');
    // check if clientEmail as retrieved from localStorage is present for the request
    if (this.clientAddressesDashboardService.parameterIsNull(this.authenticatedUser.getEmail()) === true){
      this.notification = new ErrorNotification();
      this.notification.setMessage('Κάποιο πρόβλημα προέκυψε με το αίτημα σας. Αν το πρόβλημα παραμένει παρακαλούμε αποσυνδεθείτε και συνδεθείτε ξανά!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }

    // Call the service and get the Observable Response
    this.clientAddressesDashboardService.getClientAddresses(this.authenticatedUser.email)
      .subscribe(
        clientAddressesArrayFromResponse => {


          this.clientAddressesArray = clientAddressesArrayFromResponse;

          console.log('Client Addresses Array length is: ' + this.clientAddressesArray.length);
          for (let i=0; i<this.clientAddressesArray.length; i++) {
            this.clientAddress = this.clientAddressesArray[i];
          }

        },
        error => {
          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          console.log('Unsuccessful request!');
          console.log('Error getting the client addresses array from server follows: ' + this.notification.message);
          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);
          }
          this.notificationService.updateNotificationData(this.notification);
        }
      );
  }


  private onChooseAddressForOrder(chosenAddressForOrder: Address) {
    this.chosenAddressToProcedeOrderCheckout = chosenAddressForOrder;
    this.shopingCartSharedService.addShipingAddressToCart(chosenAddressForOrder);
  }

  private checkChosenAddressVSAddressesOnUI(addressToBeChecked: Address): boolean {
    let equal: boolean = false;

    if(this.chosenAddressToProcedeOrderCheckout.id === addressToBeChecked.id) {
      equal = true;
    }
    return equal;
  }



  private checkIfAddressIsSelected(): boolean {
    if(this.chosenAddressToProcedeOrderCheckout.id) {
      return true;
    }
    return false;
  }

  private onContinueToPaymentOrder(): void {
    this.router.navigateByUrl("/order/billing");
  }

}
