export class OrderProduct {

  public productID: string;

  public orderProductName: string;

  public orderProductDescription: string;

  public orderProductPrice: number;

  public orderProductStockQuantityAtMommentOrderPlaced: number;

  public orderProductQuantity: number;

  public orderProductCategoryID: string;

  public orderProductCategoryName: string;

  public hasAniseed: boolean;

  public alcoholVolume: number;

  public dateDistilled: string;

  public governmentDistillApprovalID: string;


  public printOrerProductDetails(): void {
    console.log('------Order Product Details------');
    console.log('productID: ' + this.productID);
    console.log('orderProductName: ' + this.orderProductName);
    console.log('orderProductDescription: ' + this.orderProductDescription);
    console.log('orderProductPrice: ' + this.orderProductPrice);
    console.log('orderProductStockQuantityAtMommentOrderPlaced: ' + this.orderProductStockQuantityAtMommentOrderPlaced);
    console.log('orderProductQuantity: ' + this.orderProductQuantity);
    console.log('orderProductCategoryID: ' + this.orderProductCategoryID);
    console.log('orderProductCategoryName: ' + this.orderProductCategoryName);
  }
}
