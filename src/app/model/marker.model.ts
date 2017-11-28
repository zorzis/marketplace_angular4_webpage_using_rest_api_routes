export class Marker {
  public lat: number;
  public lng: number;
  public draggable: boolean;
  public label: string;
  public iconUrl: string;


  constructor(lat?: number,
              lng?: number,
              draggable?: boolean,
              label?: string,
              iconUrl?: string) {

    this.lat = lat;
    this.lng = lng;
    this.draggable = draggable;
    this.label = label;
    this.iconUrl = iconUrl;
  }

}
