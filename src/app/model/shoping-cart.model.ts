import {Producer} from "app/model/producer.model";
import {ShoppingCartItem} from "./shoping-cart-item.model";
import {Address} from "./address.model";
import {PaymentMethod} from "./payment-method.model";

export class ShopingCart {

  public shopingCartItems: Array<ShoppingCartItem> = [];
  public shopingCartProducerOwnsTheProducts: Producer;
  public totalCartPrice: number;
  public tax: number;

  public shipingAddress: Address;
  public paymentMethod: PaymentMethod;

  constructor() {
    this.totalCartPrice = 0;
    this.tax = 0;
  }

  public addShipingAddress(address: Address) {
    this.shipingAddress = address;
  }

  public addPaymentMethodToCart(chosenPaymentMethodForOrder: PaymentMethod) {
    this.paymentMethod = chosenPaymentMethodForOrder;
  }

  public addSpiritToShopingCart(cartItem: ShoppingCartItem) {
    this.shopingCartItems.push(cartItem);
  }


  public removeSpiritFromShopingCart(cartItem: ShoppingCartItem) {
    if(this.shopingCartItems.length !== 0) {
      this.shopingCartItems.splice(this.shopingCartItems.indexOf(cartItem) ,1);
    }
  }



}
