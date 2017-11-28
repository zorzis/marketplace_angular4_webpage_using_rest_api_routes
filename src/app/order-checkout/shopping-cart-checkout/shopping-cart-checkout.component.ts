import {Component, OnDestroy, OnInit} from "@angular/core";
import {ShopingCart} from "../../model/shoping-cart.model";
import {Subscription} from "rxjs/Subscription";
import {ShopingCartService} from "../../shoping-cart-shared-service.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../notifications/notificationsSharedService.service";
import {ErrorNotification} from "../../notifications/notificationModelError.model";
import {AbstractNotification} from "../../notifications/notificationModelAbstract.model";
import {ShoppingCartItem} from "../../model/shoping-cart-item.model";
import {Producer} from "../../model/producer.model";

@Component({
  selector: 'shopping-cart-checkout-selector',
  templateUrl: './shopping-cart-checkout.component.html',

})


export class ShoppingCartCheckoutComponent implements OnInit, OnDestroy {

  private cart: ShopingCart;
  private shoppingCartSharedServiceObservable: Subscription;
  private cartItemsCounter: number;
  private notification: AbstractNotification;



  constructor(private shopingCartSharedService: ShopingCartService,

              //private doPaypalCheckoutService: PaypalCheckoutService,

              private router: Router,
              private notificationService: NotificationService) {

    console.log('Hello From ShoppingCartCheckoutComponent::CONSTRUCTOR');
    this.cart = this.shopingCartSharedService.getShoppingCartFromMemory();
  }


  ngOnInit(): void {
    console.log('Hi There From ShoppingCartCheckoutComponent::OnInit');
    this.getShoppingCartFromSharedService();
    this.cartItemsCounter = this.shopingCartSharedService.countCartItems();

    // we remove any payment method or shipping address assigned to cart
    this.shopingCartSharedService.deleteAddressAndPaymentMethod();


  }

  ngOnDestroy(): void {
    console.log('Hi There From ShoppingCartCheckoutComponent::OnDestroy');
    this.shoppingCartSharedServiceObservable.unsubscribe();
  }

  private getShoppingCartFromSharedService(): void {
    console.log('Hi From ShoppingCartCheckoutComponent::getShoppingCartFromSharedService() START');
    const sharedServiceObservable = this.shopingCartSharedService.getShoppingCartObservable();
    this.shoppingCartSharedServiceObservable = sharedServiceObservable
      .subscribe(
        cartFromSharedService => {
            this.cart = <ShopingCart>cartFromSharedService;
            this.cartItemsCounter = this.shopingCartSharedService.countCartItems();
        });
  }


  private onContinueOrder() {
    this.router.navigateByUrl("/order/delivery");
  }


  private increaseQuantity(item: ShoppingCartItem): void {
    this.shopingCartSharedService.increaseProductQuantity(item);
  }

  private decreaseQuantity(item: ShoppingCartItem): void {
    this.shopingCartSharedService.decreaseProductQuantity(item);
  }

  private onProducerSelect(producer: Producer) {
    this.router.navigate(['/producer', producer.producerID]);
  }

  private removeItem(item: ShoppingCartItem) {
    this.shopingCartSharedService.removeItemFromCart(item);
  }

}

