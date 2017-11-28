import {Component, NgZone, OnDestroy, OnInit} from "@angular/core";
import {ProducerSharedService} from "../../producer-shared-service.service";
import {Producer} from "../../../model/producer.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'producer-profile-avatar-selector',
  templateUrl: './producer-profile-avatar.component.html',
})

export class ProducerProfileAvatarComponent implements OnInit {

  private producerFromAvatar: Producer;
  private producerSharedServiceObservable: Subscription;

  constructor(private producerSharedService: ProducerSharedService,
              private ngZone: NgZone) {}

  ngOnInit() {
    console.log('Hello from ProducerProfileAvatarComponent:: ngOnInit()');
    this.getProducerDataFromSharedService();
  }

  private getProducerDataFromSharedService(): void {
    console.log('Hello from ProducerProfileAvatarComponent::getProducerDataFromSharedService()');
    let sharedProducerServiceObservable = this.producerSharedService.getProducerData();
    this.producerSharedServiceObservable = sharedProducerServiceObservable
      .subscribe(
        producer => {
          this.ngZone.run(()=> {
            this.producerFromAvatar = <Producer>producer;
          });
        });
  }
}
