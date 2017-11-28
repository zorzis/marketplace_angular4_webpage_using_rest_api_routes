import {Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Producer} from "../../model/producer.model";
import {NotificationService} from "../../notifications/notificationsSharedService.service";
import {GetProducersService} from "./get-producers.service";
import {Router} from "@angular/router";
import {ErrorNotification} from "../../notifications/notificationModelError.model";
import {FilteredDataSharedService} from "../shared-service-filtered-data.service";
import {GetProductsCategoriesService} from "./get-products-categories.service";
import {SpiritCategory} from "../../model/spirit-category.model";
import {ProducersSearchMainService} from "./producers-search-main-service.service";
import {SearchFilterCriteria} from "../../model/search-filter-criteria.model";
import {CategoryWithSwitcherUI} from "./category-with-switcher-ui.model";
import {isUndefined} from "util";
import {Subscription} from "rxjs/Subscription";
import {SearchCriteriaFilterDataSharedService} from "../search-criteria-filter-shared-service.service";

@Component({
  selector: 'producers-search-main-selector',
  templateUrl: './producers-search-main.component.html',
})


export class ProducersSearchMainComponent implements OnInit, OnDestroy{

  private notification: any;
  private filteredProducersResults: Array<Producer>;

  private productCategories: Array<SpiritCategory>;
  private productCategoriesWithSwitcherArray: Array<CategoryWithSwitcherUI>;

  private searchFilterCriteria: SearchFilterCriteria;

  private booleanHasAniseed:boolean = false;
  private booleanNoAniseed:boolean = false;

  constructor(private notificationService: NotificationService,
              private getProducersService: GetProducersService,
              private router: Router,
              private filteredProducersArraySharedService: FilteredDataSharedService,
              private getProductCategoriesService: GetProductsCategoriesService,
              private producersSearchMainService: ProducersSearchMainService,
              private ngZone: NgZone,
              private searchCriteriaFilterSharedService: SearchCriteriaFilterDataSharedService) {
    console.log('Hello from ProducersSearchMainComponent::constructor)');

  }

  ngOnInit(): void {
    console.log('Hello from ProducersSearchMainComponent::ngOnInit()');
    this.filteredProducersResults = [];
    this.productCategoriesWithSwitcherArray = [];
    this.getSearchCriteriaObjectFromSharedService();
    this.getProductCategoriesFromServer();
    this.onSearch();
  }

  ngOnDestroy(): void {
    this.searchCriteriaFilterSharedService.clearFilterCriteria();
  }



  private getSearchCriteriaObjectFromSharedService() {
    this.searchFilterCriteria = this.searchCriteriaFilterSharedService.getSearchFilterCriteriaObject();
 }

  private getProductCategoriesFromServer() {

    console.log('Hello from ProducersSearchMainComponent::getProductCategoriesFromServer()');

    this.getProductCategoriesService.getProductsCategories()
      .subscribe(
        producersArrayFromResponse => {
          this.productCategories = producersArrayFromResponse;
          if(this.productCategories && this.searchFilterCriteria) {

            for(let cat of this.productCategories) {
              let uiCat: CategoryWithSwitcherUI = new CategoryWithSwitcherUI();
              uiCat.category = cat;

              for(let catFromHomeScreen of this.searchFilterCriteria.productsCategories) {
                if(cat.categoryID ===  catFromHomeScreen.categoryID) {
                  uiCat.isSwithcerEnabled = true;
                }
              }

              this.productCategoriesWithSwitcherArray.push(uiCat);

            }
          }

        },
        error => {
          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          console.log('Unsuccessful request!');
          console.log('Error getting the client profile from server follows: ' + this.notification.message);
          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);
          }
          this.notificationService.updateNotificationData(this.notification);
        }
      );
  }


  private onSelectProductCategory(uiCategoryWithSwitcher: CategoryWithSwitcherUI): void {
    console.log("Hello from OnSelectProductCategory");

    console.log("Category Selected is " + uiCategoryWithSwitcher.category.categoryID);

    this.searchFilterCriteria.addRemoveProductCategoryFromSearchScreen(uiCategoryWithSwitcher);

    console.log("Has aniseed value is: " + this.searchFilterCriteria.hasAniseed);
    console.log("Categories from add new cat are");

    for(let cat of this.searchFilterCriteria.productsCategories) {
      console.log(cat.categoryID);
    }


    return this.onSearch();
  }


  private onSelectYesAniseed() {
      if(this.booleanHasAniseed === true) {
        this.booleanHasAniseed = false;

        this.onSelectIfAniseed();

      } else if(this.booleanHasAniseed === false) {
        this.booleanHasAniseed = true;

        this.onSelectIfAniseed();
      }
  }

  private onSelectNoAniseed() {
    if(this.booleanNoAniseed === true) {
      this.booleanNoAniseed = false;
      this.onSelectIfAniseed();

    } else if(this.booleanNoAniseed === false) {
      this.booleanNoAniseed = true;
      this.onSelectIfAniseed();
    }
  }


  private onSelectIfAniseed() {
    if(this.booleanHasAniseed === true && this.booleanNoAniseed === true) {
      this.searchFilterCriteria.hasAniseed = undefined;
    } else if (this.booleanHasAniseed === true && this.booleanNoAniseed === false) {
      this.searchFilterCriteria.setHasAniseedBooleanValue(this.booleanHasAniseed);
    } else if (this.booleanHasAniseed === false && this.booleanNoAniseed === true) {
      this.searchFilterCriteria.setHasAniseedBooleanValue(this.booleanNoAniseed);
    } else if (this.booleanHasAniseed === false && this.booleanNoAniseed === false) {
      this.searchFilterCriteria.hasAniseed = undefined;
    }
    console.log("Has aniseed value is: " + this.searchFilterCriteria.hasAniseed);
    this.onSearch();
  }

  private onDontCareAboutAniseed() {
    this.searchFilterCriteria.hasAniseed = undefined;
  }



  private onSearch(): void {
    this.producersSearchMainService.searchForProducersResults(this.searchFilterCriteria)
      .subscribe(
        producersArrayResponse => {


          this.filteredProducersResults = producersArrayResponse;

          if(this.filteredProducersResults) {
            console.log('Filtered Producers Array length is: ' + this.filteredProducersResults.length);

            this.filteredProducersArraySharedService.updateProducersArrayData(this.filteredProducersResults);
          }
        },
        error => {
          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          console.log('Unsuccessful request!');
          console.log('Error getting the client addresses array from server follows: ' + this.notification.message);
          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);
          }
          this.notificationService.updateNotificationData(this.notification);
        }
      );
  }

}

