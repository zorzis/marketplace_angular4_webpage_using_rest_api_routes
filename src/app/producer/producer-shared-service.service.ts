import {Injectable} from "@angular/core";
import {Producer} from "../model/producer.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ProducerSharedService {
  // Observable producer sources
  private producerObservableSource = new Subject();

  // Observable producer streams
  private producer$ = this.producerObservableSource.asObservable();

  getProducerData() {
    console.log('Producer First Name from getProducerData() is ' + this.producer$);

    return this.producer$;
  }


  updateProducerData(data: any) {
    console.log('Hello from ProducerSharedService::updateProducerData()');
    console.log('Producer First Name from updateProducerData() is ' + <Producer>data.firstName);
    this.producerObservableSource.next(data);
  }
}
