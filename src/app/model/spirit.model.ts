import {SpiritCategory} from "./spirit-category.model";
import {SpiritDetails} from "./spirit-details.model";

export class Spirit {
  public productID: string;
  public productName: string;
  public productDetails: SpiritDetails;
  public productCategory: SpiritCategory;
  public quantity: number;


  public printSpiritObjectDetails(): void {
    console.log('---Spirit Object Details Follow---');
    console.log('productID: ' + this.productID);
    console.log('productName: ' + this.productName);
    console.log('quantity: ' + this.quantity);
  }

}
