export class SpiritCategory {
  public categoryID: string;
  public categoryName: string;
  public categoryDescription: string;


  constructor() {
  }

  public printSpiritCategoryObjectDetails(): void {
    console.log('---SpiritCategory Object Details Follow---');
    console.log('categoryID: ' + this.categoryID);
    console.log('categoryName: ' + this.categoryName);
    console.log('categoryDescription: ' + this.categoryDescription);
  }

}
