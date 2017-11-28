import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {Producer} from "../../../model/producer.model";
import {Spirit} from "../../../model/spirit.model";

@Component({
  selector: 'google-maps-producer-info-modal-window-selector',
  templateUrl: './google-maps-producer-info-modal-window.component.html',
})

export class GoogleMapsProducerInfoModalWindowComponent {

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
