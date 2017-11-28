export class SpiritDetails {
  public productDescription: string;
  public price: number;
  public hasAniseed: boolean;
  public alcoholVolume: number;
  public dateDistilled: string;
  public governmentDistillApprovalID: string;


  constructor() {

  }

  public printSpiritDetailsObjectDetails(): void {
    console.log('---SpiritDetails Object Details Follow---');
    console.log('productDescription: ' + this.productDescription);
    console.log('price: ' + this.price);
    console.log('hasAniseed: ' + this.hasAniseed);
    console.log('alcoholVolume: ' + this.alcoholVolume);
    console.log('Date Distilled: ' + this.dateDistilled);
    console.log('governmentDistillApprovalID: ' + this.governmentDistillApprovalID);


  }

}
