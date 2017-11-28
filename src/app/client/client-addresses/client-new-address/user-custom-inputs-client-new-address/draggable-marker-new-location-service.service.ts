import {Injectable} from "@angular/core";
import {Marker} from "../../../../model/marker.model";
import {Address} from "../../../../model/address.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DraggableMarkerNewLocationService {

  private clientAddress: Address = new Address();
  private marker: Marker = new Marker();

  // helps found here https://angular-maps.com/docs/api/latest/ts/core/index/MouseEvent-interface.html
  // $event: any instead of $event: MouseEvent
  public moveMarkerAndGetNewLocation($event: any) {

    // get the latitude,longitude of the new position of the marker
    // using the MouseEvent of google.maps.MouseEvent interface
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;

    console.log('New Coordinates of draggable marker', this.marker, $event);

    // use the new LatLong values to get the place using geocode
    let geocoder = new google.maps.Geocoder;
    let latlng = new google.maps.LatLng(this.marker.lat, this.marker.lng);
    let request = {'latLng': latlng};

    return Observable.create(observer => {
      geocoder.geocode(request, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            console.log('New Address Results using reverse geocoding are listed below');
            console.log('Postcode Localities are: ' + results[0].postcode_localities);
            console.log('Formated Address is: ' + results[0].formatted_address);
            console.log(results[1]);

            // we pass the result to the Address class object
            // to the construct function so we can parse the data using the address_components function
            // of the result
            let place: any = results[0];

            this.clientAddress = new Address();
            this.clientAddress = this.clientAddress.constructAddressObjectFromGoogleMapsPlace(place);

            console.log('New Address Custom Object is listed below');
            this.clientAddress.printAddressDetails();

            observer.next(this.clientAddress);
            observer.complete();


          } else {
            alert('No results found');
          }
        } else {

          alert('Geocoder failed due to: ' + status);
          console.log('Error - ', results, ' & Status - ', status);
          observer.next({});
          observer.complete();
        }
      });

    })

  }
}
