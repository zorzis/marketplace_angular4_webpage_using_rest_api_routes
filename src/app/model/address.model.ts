export class Address {
  public id: number;

  public street: string;

  public streetNumber: string;

  public city: string;

  public postalCode: string;

  public state: string;

  public country: string;

  public latitude: number;

  public longitude: number;

  public floor: string;


  constructor(id?: number,
              street?: string,
              streetNumber?: string,
              city?: string,
              postalCode?: string,
              state?: string,
              country?: string,
              latitude?: number,
              longitude?: number,
              floor?: string,
              ) {

    this.id = id;
    this.street = street;
    this.streetNumber = streetNumber;
    this.city = city;
    this.postalCode = postalCode;
    this.state = state;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.floor = floor;
  }

  public constructAddressObjectFromGoogleMapsPlace(place: any): Address {
    let address: Address = new Address();

    //set latitude, longitude
    let lat = place.geometry.location.lat();
    address.latitude = lat;
    console.log('Latitude is: ' + lat);

    let lng = place.geometry.location.lng();
    address.longitude = lng;
    console.log('Longitude is: ' + lng);


    let route = this.extractFromGoogleAddress(place, 'route');
    address.street = route;
    console.log('Route is: ' + route);

    let streetNumber = this.extractFromGoogleAddress(place, 'street_number');
    address.streetNumber = streetNumber;
    console.log('Street Number is: ' + streetNumber);

    let city = this.extractFromGoogleAddress(place, 'locality');
    address.city = city
    console.log('City is: ' + city);

    let postalCode = this.extractFromGoogleAddress(place, 'postal_code');
    address.postalCode = postalCode;
    console.log('Postal Code is: ' + postalCode);

    let country = this.extractFromGoogleAddress(place, 'country');
    address.country = country;
    console.log('Country is: ' + country);

    let region4 = this.extractFromGoogleAddress(place, 'administrative_area_level_4');
    console.log('administrative_area_level_4 is: ' + region4);

    let region3 = this.extractFromGoogleAddress(place, 'administrative_area_level_3');
    address.state = region3;
    console.log('administrative_area_level_3 is: ' + region3);

    let region2 = this.extractFromGoogleAddress(place, 'administrative_area_level_2');
    console.log('administrative_area_level_2 is: ' + region2);

    let region1 = this.extractFromGoogleAddress(place, 'administrative_area_level_1');
    console.log('administrative_area_level_1 is: ' + region1);

    return address;
  }

  private extractFromGoogleAddress(place: any, type: string) {
    let google_address_components = place.address_components;

    for(var i = 0; i<google_address_components.length; i++) {
      for (var j=0; j<google_address_components[i].types.length; j++) {

        if (google_address_components[i].types[j] == type) {
          return google_address_components[i].long_name;
        }
      }
    }
  }

  public printAddressDetails(): void {
    console.log('------Address Details------');
    console.log('id: ' + this.id);
    console.log('street: ' + this.street);
    console.log('streetNumber: ' + this.streetNumber);
    console.log('city: ' + this.city);
    console.log('postalCode: ' + this.postalCode);
    console.log('state: ' + this.state);
    console.log('country: ' + this.country);
    console.log('latitude: ' + this.latitude);
    console.log('longitude: ' + this.longitude);
    console.log('floor: ' + this.floor);
  }
}
