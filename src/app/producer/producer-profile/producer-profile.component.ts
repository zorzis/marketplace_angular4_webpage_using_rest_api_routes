import {Component, NgZone, OnDestroy, OnInit} from "@angular/core";
import {Producer} from "../../model/producer.model";
import {ProducerService} from "../producer-service.service";
import {NotificationService} from "../../notifications/notificationsSharedService.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ErrorNotification} from "../../notifications/notificationModelError.model";
import {Spirit} from "../../model/spirit.model";
import {ShopingCartService} from "../../shoping-cart-shared-service.service";


declare let liquid: any;

@Component({
  selector: 'producer-profile-selector',
  templateUrl: './producer-profile.component.html',
})




export class ProducerProfileComponent implements OnInit {

  private producerFromProfile: Producer;
  private notification: any;
  private spiritArray: Array<Spirit>;



  constructor(private producerService: ProducerService,
              private shopingCartService: ShopingCartService,
              private ngZone: NgZone,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,) {

  }

  ngOnInit() {
    console.log('Hello from ProducerProfileComponent::OnInit()');
    this.activatedRoute.params
    // (+) converts string 'id' to a number
      .subscribe((params: Params) => {
        this.getProducerFromServerResponse(params['id'])
      });

  }

  private getProducerFromServerResponse(producerID: string) {
    console.log('Hello from ProducerProfileComponent::getProducerFromServerResponse()');

    this.producerService.getProducerFromServer(producerID)
      .subscribe(
        producerFromServer => {
          this.ngZone.run(()=> {
            this.producerFromProfile = producerFromServer;
            if(this.producerFromProfile) {
              this.spiritArray = this.producerFromProfile.products;
            }
          });
        },
        error =>  {
          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          console.log('Unsuccessful request!');
          console.log('Error getting the client profile from server follows: ' + this.notification.message);
          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);
          }
          this.notificationService.updateNotificationData(this.notification);

          this.router.navigateByUrl('/');
        }
      );
  }


  private addProductToShopingCart(spiritToBeAddedToCart: Spirit) {
    this.shopingCartService.addCartItemToShoppingCart(spiritToBeAddedToCart, this.producerFromProfile);

  }



}
