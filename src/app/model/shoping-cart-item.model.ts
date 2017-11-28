import {Spirit} from "./spirit.model";
import {Producer} from "./producer.model";
export class ShoppingCartItem {

  public productID: string;
  public productName: string;

  public producerID: string;
  public producerEmail: string;
  public producerFirstName: string;
  public producerLastName: string;

  public productDescription: string;
  public price: number;
  public orderProductQuantity: number;

  public categoryID: string;
  public categoryName: string;
  public categoryDescription: string;

  public itemStockQuantityAtMommentOrderPlaced: number;

  public totalPrice: number;

  constructor(spirit: Spirit, producer: Producer) {

    this.productID = spirit.productID;
    this.productName = spirit.productName;
    this.producerID = producer.producerID;
    this.producerEmail = producer.email;
    this.producerFirstName = producer.firstName;
    this.producerLastName = producer.lastName;
    this.productDescription = spirit.productDetails.productDescription;
    this.price = spirit.productDetails.price;
    this.orderProductQuantity = 1;
    this.categoryID = spirit.productCategory.categoryID;
    this.categoryName = spirit.productCategory.categoryName;
    this.categoryDescription = spirit.productCategory.categoryDescription;
    this.itemStockQuantityAtMommentOrderPlaced = spirit.quantity;
    this.totalPrice = spirit.productDetails.price * this.orderProductQuantity;
  }

}
