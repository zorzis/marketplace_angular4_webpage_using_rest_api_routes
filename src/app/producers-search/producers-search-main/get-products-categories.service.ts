import {Injectable} from "@angular/core";
import {AuthService} from "../../auth/auth.service";

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {SpiritCategory} from "../../model/spirit-category.model";


@Injectable()
export class GetProductsCategoriesService {

  // URL to REST API
  private getProductsCategoriesURL: string = 'http://localhost:9090/client/get_products_categories';

  constructor(private http: Http,
              private authSevice: AuthService) {
  }




  public getProductsCategories(): Observable<Array<SpiritCategory>> {
    console.log(`Hello from GetProductsCategoriesService::getProductsCategories`);

    return this.http.get(this.getProductsCategoriesURL)
      .map(this.extractData)
      .catch(this.handleError);

  }


  private extractData(res: Response) {
    const body = res.json();


    console.log(`Successfull Response from Server ==>`);
    console.log(body);

    return body || {};
  }


  private handleError(error: Response | any) {


    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;

    if (error instanceof Response) {
      console.log('Error is instanceOf Response');

      const body = error.json() || '';
      console.log('Error transformation using "error.json()" is: ' + body.toString());


      let err: any;

      if (body.error) {
        err = body.error;
        console.log('Error transformation using "body.error" is: ' + err.toString());
        errMsg = `${error.status} - ${error.statusText || ''}  ==>  ${err}`;

      } else if (error.status === 0) {
        const strangeError = {
          'status': error.status,
          'message': 'Η σύνδεση με τον διακομιστή δεν είναι δυνατή αυτή τη στιγμή. Παρακαλούμε προσπαθήστε σε λίγο!'
        };
        err = JSON.stringify(strangeError);
        errMsg = err;


      } else {
        err = JSON.stringify(body);
        console.log('Error transformation using "JSON.stringify(body)" is: ' + err.toString());
        console.log(`Full error log is: error.status[ ${error.status} ], error.statusText[ ${error.statusText || ''} ]`);

        errMsg = err;

      }
    } else {
      console.log('Following error is NOT an instanceof Response');

      if (error.message) {
        errMsg = error.message;
      } else {
        errMsg = error.toString();
      }

    }

    console.error(errMsg);

    return Observable.throw(errMsg);


  }


  public parameterIsNull(someValue: any) {
    console.log('Hello from GetProductsCategoriesService::parameterIsNull');

    if (!someValue || someValue.length === 0 || someValue === null) {
      const errorToBeThrown = 'Parameter provided Cannot be null';
      console.error('Error produced is: ' + errorToBeThrown);
      return true;
    } else {
      console.log('[ ' + someValue + ' ] is not null');
      return false;
    }
  }

}
