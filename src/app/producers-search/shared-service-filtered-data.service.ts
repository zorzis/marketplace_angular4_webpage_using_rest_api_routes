import {Injectable, OnInit} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Producer} from "../model/producer.model";

@Injectable()
export class FilteredDataSharedService implements OnInit{

  private producersArray: Array<Producer>;

  // Observable producersArray sources
  private producersArrayObservableSource = new Subject();

  // Observable producersArray streams
  private producersArray$ = this.producersArrayObservableSource.asObservable();


  constructor() {
    this.producersArray = [];
  }

  ngOnInit() {
    this.producersArray = [];
  }


  public getProducersArrayObservableData() {
    console.log('Producers Array length is ' + this.producersArray$);

    return this.producersArray$;
  }


  public updateProducersArrayData(observableProducersArray: any) {
    console.log('Hello from FilteredDataSharedService::updateProducerData()');

    if(observableProducersArray) {
      console.log('Producers Array length from updateProducersArrayData() is ' + <Array<Producer>>observableProducersArray.length);
    }


    this.producersArray = observableProducersArray;
    this.producersArrayObservableSource.next(observableProducersArray);
  }


}
