import {ShoppingCartItem} from "./shoping-cart-item.model";
import {ShoppingCartProductForOrderRequest} from "./shopping-cart-product-for-order-request.model";
export class ShoppingCartDTO {
  shoppingCartID: string;
  customerEmail: string;
  producerID: string;
  clientAddressID: number;
  paymentMethodID: string;
  shoppingCartProducts: Array<ShoppingCartProductForOrderRequest> = [];

  constructor(email: string,
              producerID: string,
              clientAddressID: number,
              paymentMethodID: string,
              shoppingCartItems: Array<ShoppingCartItem>) {
    this.customerEmail = email;
    this.producerID = producerID;
    this.clientAddressID = clientAddressID;
    this.paymentMethodID = paymentMethodID;
    this.shoppingCartProducts = this.parseShoppingCartItemToShoppingCartProductForOrderRequest(shoppingCartItems);
  }

  private parseShoppingCartItemToShoppingCartProductForOrderRequest(shoppingCartItems: Array<ShoppingCartItem>): Array<ShoppingCartProductForOrderRequest> {
    let arrayOfOrderProducts: Array<ShoppingCartProductForOrderRequest> = [];

    for(let shopingCartItem of shoppingCartItems) {
      let orderProduct: ShoppingCartProductForOrderRequest = new ShoppingCartProductForOrderRequest();
      orderProduct.productID = shopingCartItem.productID;
      orderProduct.orderProductQuantity = shopingCartItem.orderProductQuantity;
      arrayOfOrderProducts.push(orderProduct);
    }
    return arrayOfOrderProducts;
  }
}
