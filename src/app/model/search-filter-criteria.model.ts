import {SpiritCategory} from "./spirit-category.model";
import {Address} from "./address.model";
import {CategoryWithSwitcherUI} from "../producers-search/producers-search-main/category-with-switcher-ui.model";

export class SearchFilterCriteria {
  public productsCategories: Array<SpiritCategory> = [];
  public hasAniseed: boolean;
  public producerAddress: Address;

  constructor() {

  }

  public setHasAniseedBooleanValue(booleanValue: boolean): void {
    this.hasAniseed = booleanValue;
  }

  public selectProductCategoryFromHomeScreen(cat: SpiritCategory) {
    let booleanFound: boolean = false;
    for(let spiritCat of this.productsCategories) {
      if(spiritCat.categoryID === cat.categoryID) {
        booleanFound = true;
      }
    }
    // if found then delete it
    if(!booleanFound) {
      this.productsCategories.push(cat);
      console.log("Category added from Homescreen is: " + cat.categoryID);
    }
  }


  public addRemoveProductCategoryFromSearchScreen(uiCategoryWithSwitcher: CategoryWithSwitcherUI): void {
    let booleanFound: boolean = false;
    for(let spiritCat of this.productsCategories) {
      if((spiritCat.categoryID === uiCategoryWithSwitcher.category.categoryID) && uiCategoryWithSwitcher.isSwithcerEnabled) {
        booleanFound = true;
      }
    }
    // if found then delete it
    if(booleanFound) {
      const index: number = this.productsCategories.indexOf(uiCategoryWithSwitcher.category);
      this.productsCategories.splice(index, 1);
      uiCategoryWithSwitcher.isSwithcerEnabled = false;
    } else if(!booleanFound) {
      this.productsCategories.push(uiCategoryWithSwitcher.category);
      uiCategoryWithSwitcher.isSwithcerEnabled = true;
    }
  }


}
