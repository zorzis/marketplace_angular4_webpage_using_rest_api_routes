import {Injectable, OnInit} from "@angular/core";
import {Producer} from "./model/producer.model";
import {Spirit} from "./model/spirit.model";
import {ShoppingCartItem} from "./model/shoping-cart-item.model";
import {Subject} from "rxjs/Subject";
import {ShopingCart} from "./model/shoping-cart.model";
import {NotificationService} from "./notifications/notificationsSharedService.service";
import {ErrorNotification} from "./notifications/notificationModelError.model";
import {AbstractNotification} from "./notifications/notificationModelAbstract.model";
import {InfoNotification} from "./notifications/notificationModelInfo.model";
import {SuccessNotification} from "./notifications/notificationModelSuccess.model";
import {Address} from "./model/address.model";
import {PaymentMethod} from "./model/payment-method.model";


@Injectable()
export class ShopingCartService implements OnInit{


  private cart: ShopingCart;
  private notification: AbstractNotification;





  // Observable cart sources
  private cartObservableSource = new Subject();
  // Observable cart streams
  private cart$ = this.cartObservableSource.asObservable();


  constructor(private notificationService: NotificationService) {
    this.cart = new ShopingCart();
    this.cart.shopingCartProducerOwnsTheProducts = null;
    this.cart.paymentMethod = null;
    this.cart.shipingAddress = null;
  }


  ngOnInit(): void {
    this.cart = this.getShoppingCartFromLocalStorage();
    this.cart.shopingCartProducerOwnsTheProducts = new Producer();
  }

  // make all the checks if the product to be added belongs to current shopping cart producer
  // and if yes constructs the shopping cart item,
  // and finally creates an observable so the component can be notified in any change of the quantity and products
  public addCartItemToShoppingCart(spirit: any, producer: any) {

    console.log('Hello from ShopingCartService::addCartItemToShoppingCart()');
    this.scenarioSelector(spirit, producer);

  }


  private scenarioSelector(spirit: any, producer: any): void {

    let cartItem = new ShoppingCartItem(<Spirit>spirit, <Producer>producer);


    // *** 1st Scenario ***
    // - When app is initialized there is no Producer that owns the ShoppingCart
    // - and also the Cart contains no Products
    // *we have init the producer to NULL in the Service Constructor
    if(this.cart.shopingCartProducerOwnsTheProducts === null && this.cart.shopingCartItems.length === 0) {

      console.log('Scenario: PRODUCER IS NULL && CART IS EMPTY');
      this.cart.shopingCartProducerOwnsTheProducts = producer;
      this.pureItemAdditionToCartNoValidations(cartItem);
      return;
    }



    // *** 2nd Scenario ***
    // -When there is a producer or not and the cart contains items
    // at first we check if producer of cart is the shame as the Item claims to be added Producer
    // if yes then check if product already in the cart
    if(this.cart.shopingCartItems.length !== 0) {

      console.log('Scenario: CART NOT EMPTY');

      // check for producer
      // in case NOT SHAME PRODUCER
      if(this.checkIfItemBelongsToShoppingCartProducer(cartItem, this.cart.shopingCartProducerOwnsTheProducts) === false)
      {

        this.cart.shopingCartItems.length = 0;

        this.cart.shopingCartProducerOwnsTheProducts = producer;

        this.notification = new ErrorNotification();
        this.notification.setMessage('Το απόσταγμα που επιλέξατε ανήκει σε παραγωγό διαφορετικό από αυτόν του οποίου έχετε επιλέξει ήδη αποστάγματα! Τα αποστάγματα που προυπήρχαν θα αφαιρεθούν και θα προστεθούν τα νέα');
        this.notificationService.updateNotificationData(this.notification);

      }


      // check for product
      // do the validation that product to be inserted is unique
      if(this.checkIfItemAlreadyExists(cartItem, this.cart) === true) {
        this.notification = new ErrorNotification();
        this.notification.setMessage('Το απόσταγμα που επιλέξατε υπάρχει ήδη στο καλάθι αγορών σας!');
        this.notificationService.updateNotificationData(this.notification);
        return;

      }

      this.pureItemAdditionToCartNoValidations(cartItem);

      return;

    }



    // *** 3rd Scenario ***
    // When there are no products in the cart but there is a producer
    if(this.cart.shopingCartItems.length === 0 && this.cart.shopingCartProducerOwnsTheProducts) {
      console.log('Scenario: PRODUCER NOT NULL && CART IS EMPTY');

      // check for producer
      // in case NOT SHAME PRODUCER
      if(this.checkIfItemBelongsToShoppingCartProducer(cartItem, this.cart.shopingCartProducerOwnsTheProducts) === false)
      {

        this.cart.shopingCartItems.length = 0;

        this.cart.shopingCartProducerOwnsTheProducts = producer;
      }

      // check for product
      // do the validation that product to be inserted is unique
      if(this.checkIfItemAlreadyExists(cartItem, this.cart) === true) {
        this.notification = new ErrorNotification();
        this.notification.setMessage('Το απόσταγμα που επιλέξατε υπάρχει ήδη στο καλάθι αγορών σας!');
        this.notificationService.updateNotificationData(this.notification);
        return;

      }

      this.calculateTotalCartPrice();

      this.pureItemAdditionToCartNoValidations(cartItem);
      this.persistShoppingCartToLocalStorage(this.cart);

      return

    }

  }



  // persistShoppingCartToLocalStorage
  public persistShoppingCartToLocalStorage(cart: ShopingCart) {
    if(localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }


  public removeItemFromCart(item: ShoppingCartItem) {
    this.cart.removeSpiritFromShopingCart(item);

    this.calculateTotalCartPrice();

    let observableCart: any = this.cart;
    // notify components subscribed to the observable source
    this.cartObservableSource.next(observableCart);
    this.persistShoppingCartToLocalStorage(this.cart);

    this.notification = new SuccessNotification();
    this.notification.setMessage('Το απόσταγμα που επιλέξατε απομακρύνθηκε από το καλάθι αγορών σας!');
    this.notificationService.updateNotificationData(this.notification);
  }

  public getShoppingCartObservable() {
    console.log('Hello from ShopingCartService::getShoppingCartObservable()');
    this.calculateTotalCartPrice();
    return this.cart$;
  }

  public getShoppingCartFromMemory() {
    return this.cart;
  }

  // create ShopingCart from storage JSON ShopingCart Item
  public getShoppingCartFromLocalStorage(): ShopingCart {
    let shoppingCart: ShopingCart;
    let shoppingCartInJSON: string;
    if(localStorage.getItem("cart")) {
      shoppingCartInJSON = localStorage.getItem("cart");
      shoppingCart = JSON.parse(shoppingCartInJSON);
    } else {
      shoppingCart = new ShopingCart();
      shoppingCart.shopingCartProducerOwnsTheProducts = null;

    }
    return shoppingCart;
  }

  public countCartItems(): number {
    return this.cart.shopingCartItems.length;
  }


  public clearCart(): void {
    this.cart.shopingCartItems.length = 0;
    this.cart.shopingCartProducerOwnsTheProducts = null;
    this.cart.shipingAddress = new Address();
    localStorage.removeItem("cart");

    // notify components subscribed to the observable source
    let observableCart: any = this.cart;
    this.cartObservableSource.next(observableCart);
  }



  private checkIfItemAlreadyExists(itemToBeChecked: ShoppingCartItem, cartToBeIterated: ShopingCart): boolean {
    let itemAlreadyExists = false;

    for(let i = 0; i<cartToBeIterated.shopingCartItems.length; i++) {
      if(itemToBeChecked.productID === cartToBeIterated.shopingCartItems[i].productID) {
        itemAlreadyExists = true;
        break;
      }
    }
    return itemAlreadyExists;
  }

  private checkIfItemBelongsToShoppingCartProducer(itemToBeChecked: ShoppingCartItem, producerOwnsTheCart: Producer): boolean {
    let itemBelongsToShoppingCartProducer = false;

    if(itemToBeChecked.producerID === producerOwnsTheCart.producerID) {
      itemBelongsToShoppingCartProducer = true;
    }
    return itemBelongsToShoppingCartProducer;
  }

  private pureItemAdditionToCartNoValidations(cartItem: ShoppingCartItem): void {
    this.cart.addSpiritToShopingCart(cartItem);
    let observableCart: any = this.cart;
    // notify components subscribed to the observable source
    this.cartObservableSource.next(observableCart);
    console.log('Shopping Cart Items after insertion are: ' + this.cart.shopingCartItems.length);

    this.notification = new InfoNotification();
    this.notification.setMessage('Το απόσταγμα που επιλέξατε προστέθηκε στο καλάθι αγορών σας!');
    this.notificationService.updateNotificationData(this.notification);
  }


  private checkItemStockQuantityAvailability(item: ShoppingCartItem): boolean
  {

    if(item.itemStockQuantityAtMommentOrderPlaced > 0)
    {
      if(item.orderProductQuantity <= 5 && item.orderProductQuantity >= 0.5)
      {
        if(item.itemStockQuantityAtMommentOrderPlaced > item.orderProductQuantity)
        {
          return true;
        }
      }
    }

    return false;
  }

  public increaseProductQuantity(item: ShoppingCartItem): void {

    for(let i=0; i<this.cart.shopingCartItems.length; i++) {
      if(item.productID === this.cart.shopingCartItems[i].productID)
      {


        // TODO make the checks for stock Quantity etc

        if(this.checkItemStockQuantityAvailability(this.cart.shopingCartItems[i]) === true)
        {
          this.cart.shopingCartItems[i].orderProductQuantity += 0.5;

          if(this.checkItemStockQuantityAvailability(this.cart.shopingCartItems[i]) === false)
          {
            this.cart.shopingCartItems[i].orderProductQuantity -= 0.5;
          }
        }

        this.cart.shopingCartItems[i].totalPrice = this.calculateTotalPriceForCartItemByQuantity(this.cart.shopingCartItems[i]);

        this.calculateTotalCartPrice();

        let observableCart: any = this.cart;

        // notify components subscribed to the observable source
        this.cartObservableSource.next(observableCart);
        this.persistShoppingCartToLocalStorage(this.cart);}
    }
  }


  public decreaseProductQuantity(item: ShoppingCartItem): void {

    for(let i=0; i<this.cart.shopingCartItems.length; i++) {
      if(item.productID === this.cart.shopingCartItems[i].productID)
      {


        // TODO make the checks for stock Quantity etc

        if(this.checkItemStockQuantityAvailability(this.cart.shopingCartItems[i]) === true)
        {
          this.cart.shopingCartItems[i].orderProductQuantity -= 0.5;

          if(this.checkItemStockQuantityAvailability(this.cart.shopingCartItems[i]) === false)
          {
            this.cart.shopingCartItems[i].orderProductQuantity += 0.5;
          }
        }


        this.cart.shopingCartItems[i].totalPrice = this.calculateTotalPriceForCartItemByQuantity(this.cart.shopingCartItems[i]);

        this.calculateTotalCartPrice();

        let observableCart: any = this.cart;

        // notify components subscribed to the observable source
        this.cartObservableSource.next(observableCart);
        this.persistShoppingCartToLocalStorage(this.cart);
      }
    }
  }


  public calculateTotalPriceForCartItemByQuantity(item: ShoppingCartItem): number {

    let totalItemPrice: number;

    totalItemPrice = item.price * item.orderProductQuantity;

    console.log('Total Price for product is: ' + totalItemPrice);


    return totalItemPrice;
  }

  public calculateTotalCartPrice(): void {

    this.cart.totalCartPrice = 0;
    this.cart.tax = 0;

    for(let i=0; i<this.cart.shopingCartItems.length; i++) {

      this.cart.totalCartPrice += this.cart.shopingCartItems[i].totalPrice

    }


    this.cart.tax = 0.24 * this.cart.totalCartPrice;

    this.cart.totalCartPrice = this.cart.totalCartPrice + this.cart.tax;

    console.log('Total Cart PRICE is ' + this.cart.totalCartPrice);

  }


  public isCartEmpty(): boolean {

    if(this.cart) {
      if(this.cart && this.cart.shopingCartItems.length <= 0) {
        return true;
      }
    } else if(!this.cart) {
      return true;
    }
    return false
  }

  public addShipingAddressToCart(address: Address): void {
    this.cart.addShipingAddress(address);

    let observableCart: any = this.cart;

    // notify components subscribed to the observable source
    this.cartObservableSource.next(observableCart);
    this.persistShoppingCartToLocalStorage(this.cart);
  }

  public addPaymentMethodToCart(paymentMethod: PaymentMethod): void {
    this.cart.addPaymentMethodToCart(paymentMethod);

    let observableCart: any = this.cart;

    // notify components subscribed to the observable source
    this.cartObservableSource.next(observableCart);
    this.persistShoppingCartToLocalStorage(this.cart);
  }

  public deleteAddressAndPaymentMethod(): void {
    this.cart.paymentMethod = new PaymentMethod();
    this.cart.shipingAddress = new Address();
    let observableCart: any = this.cart;

    // notify components subscribed to the observable source
    this.cartObservableSource.next(observableCart);
    this.persistShoppingCartToLocalStorage(this.cart);

  }


  public deleteAddress(): void {
    this.cart.shipingAddress = new Address();
    let observableCart: any = this.cart;

    // notify components subscribed to the observable source
    this.cartObservableSource.next(observableCart);
    this.persistShoppingCartToLocalStorage(this.cart);
  }

  public deletePaymentMethod(): void {
    this.cart.paymentMethod = new PaymentMethod();
    let observableCart: any = this.cart;

    // notify components subscribed to the observable source
    this.cartObservableSource.next(observableCart);
    this.persistShoppingCartToLocalStorage(this.cart);
  }

}
