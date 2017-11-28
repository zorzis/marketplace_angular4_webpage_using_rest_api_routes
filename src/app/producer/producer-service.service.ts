import {Injectable} from "@angular/core";
import {Producer} from "../model/producer.model";

import {Http, RequestOptions, Response} from '@angular/http';
import { Headers, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProducerService {

  private getProducerFromServerURL: string = 'http://localhost:9090/client/get_producer';


  private producer: Producer;

  constructor(private http: Http) {

  }


  public getProducerFromServer(producerID: string): Observable<Producer> {

    console.log('Hello from ProducerService::getProducerFromServer');
    console.log('ProducerID for the request is: ' + producerID);

    // set the request parameters to be send
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('producerID', producerID);
    const paramsBody = urlSearchParams.toString();

    console.log('paramsBody is: ' + paramsBody.toString());

    // set the headers of the request locally
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.getProducerFromServerURL, paramsBody, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  private extractData(res: Response) {
    const body = res.json();
    console.log('Successfull Response from Server ==>');
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


      } else if (error.status === 404) {
        const strangeError = {
          'status': error.status,
          'message': 'Δε βρέθηκε ο συγκεκριμένος παραγωγός. Παρακαλούμε προσπαθήστε ξανά!'
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


}

