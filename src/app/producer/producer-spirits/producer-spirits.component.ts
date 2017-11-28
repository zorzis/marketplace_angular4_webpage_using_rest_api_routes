import {Component, NgZone, OnDestroy, OnInit} from "@angular/core";
import {Producer} from "../../model/producer.model";
import {ProducerService} from "../producer-service.service";
import {NotificationService} from "../../notifications/notificationsSharedService.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ErrorNotification} from "../../notifications/notificationModelError.model";
import {Spirit} from "../../model/spirit.model";
import {ShopingCartService} from "../../shoping-cart-shared-service.service";



@Component({
  selector: 'producer-spirits-selector',
  templateUrl: './producer-spirits.component.html',
})


export class ProducerSpiritsComponent implements OnInit {

  private producerFromSpirits: Producer;
  private spirit: Spirit;
  private spiritArray: Array<Spirit>;

  private notification: any;

  // the external JS we use to show aniamated spirit quantity circles
  private liquidGauceVariable: any;


  constructor(private producerService: ProducerService,
              private ngZone: NgZone,
              private notificationService: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private shopingCartService: ShopingCartService,) {

  }



  ngOnInit() {
    console.log('Hello from ProducerSpiritsComponent::ngOnInit()');
    this.activatedRoute.params
    // (+) converts string 'id' to a number
      .subscribe((params: Params) => {
        this.getProducerFromServerResponse(params['id'])
      });


  }

  private getProducerFromServerResponse(producerID: string) {
    console.log('Hello from ProducerComponent::getProducerFromServerResponse()');

    this.producerService.getProducerFromServer(producerID)
      .subscribe(
        producerFromServer => {
          this.ngZone.run(()=> {
            this.producerFromSpirits = producerFromServer;

            if(this.producerFromSpirits) {
              this.spiritArray = this.producerFromSpirits.products;
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
    this.shopingCartService.addCartItemToShoppingCart(spiritToBeAddedToCart, this.producerFromSpirits);

  }



}
