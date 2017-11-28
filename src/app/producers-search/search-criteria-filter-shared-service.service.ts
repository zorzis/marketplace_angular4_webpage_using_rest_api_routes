import {Injectable, OnInit} from "@angular/core";
import {SearchFilterCriteria} from "../model/search-filter-criteria.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SearchCriteriaFilterDataSharedService implements OnInit{

  private searchFilterCriteria: SearchFilterCriteria;

  // Observable producersArray sources
  private searchFilterCriteriaObservableSource = new Subject();

  // Observable producersArray streams
  private searchFilterCriteria$ = this.searchFilterCriteriaObservableSource.asObservable();



  constructor() {
    this.searchFilterCriteria = new SearchFilterCriteria();
  }

  ngOnInit() {
    this.searchFilterCriteria = new SearchFilterCriteria();
  }


  public clearFilterCriteria(): void {
    this.searchFilterCriteria = new SearchFilterCriteria();
  }

  public getSearchFilterCriteriaObservableData() {
    return this.searchFilterCriteria$;
  }


  public getSearchFilterCriteriaObject() {
    console.log("Categories from  getSearchFilterCriteriaObject()  are");

    for(let cat of this.searchFilterCriteria.productsCategories) {
      console.log("Cat: " + cat.categoryID);
    }
    return this.searchFilterCriteria;

  }


  public updateSearchFilterCriteriaData(observableSearchFilterCriteria: any) {
    console.log('Hello from FilteredDataSharedService::updateSearchFilterCriteriaData()');
    this.searchFilterCriteria = <SearchFilterCriteria>observableSearchFilterCriteria;

    console.log("Categories from update shared service are");
    for(let cat of this.searchFilterCriteria.productsCategories) {
      console.log("Cat: " + cat.categoryID);
    }
    this.searchFilterCriteriaObservableSource.next(observableSearchFilterCriteria);
  }


}
