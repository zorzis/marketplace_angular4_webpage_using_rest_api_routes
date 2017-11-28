import {Component, Input} from "@angular/core";
import {Producer} from "../../model/producer.model";
import {Router} from "@angular/router";
import {Spirit} from "../../model/spirit.model";

@Component({
  selector: 'google-maps-producer-info-window-selector',
  templateUrl: './google-maps-producer-info-window.component.html',
})

export class GoogleMapsProducerInfoWindowComponent {

  @Input()
  private producer: Producer;

  @Input()
  private spiritArray: Array<Spirit>;


  constructor(private router: Router) {
  }

  // we get the selected producer from the google maps popup marker info window
  onSelect(producer: Producer) {
    this.router.navigate(['/producer', producer.producerID]);
  }



}
