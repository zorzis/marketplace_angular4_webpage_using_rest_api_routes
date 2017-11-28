import {Component, NgZone, OnInit} from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {SpiritCategory} from "../../model/spirit-category.model";
import {SearchFilterCriteria} from "../../model/search-filter-criteria.model";
import {Subscription} from "rxjs/Subscription";
import {SearchCriteriaFilterDataSharedService} from "../../producers-search/search-criteria-filter-shared-service.service";
import {GetProductsCategoriesService} from "../../producers-search/producers-search-main/get-products-categories.service";
import {NotificationService} from "../../notifications/notificationsSharedService.service";
import {ErrorNotification} from "../../notifications/notificationModelError.model";
import {Router} from "@angular/router";

@Component({
  selector: 'homepage-search-producers-selector',
  templateUrl: './homepage-search-producers.component.html',
})


export class HomePageSearchProducersComponent implements OnInit{
  private notification: any;

  private productCategories: Array<SpiritCategory>;
  private searchFilterCriteria: SearchFilterCriteria = new SearchFilterCriteria();


  private searchCriteriaFitlerSharedServiceObservable: Subscription;


  constructor(private router: Router,
              private notificationService: NotificationService,
              private searchCriteriaFilterSharedService: SearchCriteriaFilterDataSharedService,
              private getProductCategoriesService: GetProductsCategoriesService,
  ) {

  }

  ngOnInit() {
    this.searchFilterCriteria = new SearchFilterCriteria();
    this.getProductCategoriesFromServer();

  }


  private getProductCategoriesFromServer() {
    console.log('Hello from ProducersSearchMainComponent::getProductCategoriesFromServer()');

    this.getProductCategoriesService.getProductsCategories()
      .subscribe(
        producersArrayFromResponse => {
          this.productCategories = producersArrayFromResponse;
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

  private onSelectSingleCategory(cat: SpiritCategory) {
    this.searchFilterCriteria.selectProductCategoryFromHomeScreen(cat);
    this.searchCriteriaFilterSharedService.updateSearchFilterCriteriaData(this.searchFilterCriteria);
    this.router.navigateByUrl("/search");
  }
}
