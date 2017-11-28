import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Address} from "../../../model/address.model";

@Injectable()
export class AddressSharedService {
  // Observable address sources
  private addressObservableSource = new Subject();
  private isAddressConfirmationEnabledObservableSource = new Subject();

  // Observable address streams
  private address$ = this.addressObservableSource.asObservable();
  private enableConfirmation$ = this.isAddressConfirmationEnabledObservableSource.asObservable();

  getAddressData() {
    return this.address$;
  }

  getIsConfirmationEnabled() {
    return this.enableConfirmation$;
  }

  updateAddressData(data: any) {
    console.log('Hello from AddressSharedService::updateAddressData =>Data to be updated is: ');
    <Address>data.printAddressDetails();

    this.addressObservableSource.next(data);
  }

  updateIsConfirmationEnabled(data: any) {
    console.log('Hello from AddressSharedService::updateIsConfirmationEnabled =>Data to be updated is: ' + data.toString());
    this.isAddressConfirmationEnabledObservableSource.next(data);
  }
}
