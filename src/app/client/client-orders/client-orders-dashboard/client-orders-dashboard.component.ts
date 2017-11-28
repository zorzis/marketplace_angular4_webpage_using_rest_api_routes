import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticatedUser} from "../../../auth/model/authenticated-user.model";
import {Order} from "../../../model/order.model";
import {AuthService} from "../../../auth/auth.service";
import {NotificationService} from "app/notifications/notificationsSharedService.service";
import {ClientOrdersDashboardService} from "./client-orders-dashboard.service";
import {ErrorNotification} from "../../../notifications/notificationModelError.model";
import {OrderProduct} from "../../../model/order-product.model";
import {Producer} from "app/model/producer.model";


@Component({
  selector: 'client-orders-dashboard-selector',
  templateUrl: './client-orders-dashboard.component.html',
})


export class ClientOrdersDashboardComponent {

  private authenticatedUser: AuthenticatedUser;
  private notification: any;
  private ordersArray: Array<Order>;

  constructor( private authService: AuthService,
               private clientOrdersService: ClientOrdersDashboardService,
               private notificationService: NotificationService,
               private router: Router) {

  }


  ngOnInit() {
    console.log('Hello from ClientOrdersDashboardComponent::OnInit');
    this.authenticatedUser = this.authService.retrieveAuthenticatedUserFromLocalStorage();
    this.getClientOrdersFromServerResponse();
  }

  private getClientOrdersFromServerResponse() {
    console.log('Hello from ClientOrdersDashboardComponent::getClientOrdersFromServerResponse()');

    // check if clientEmail as retrieved from localStorage is present for the request
    if (this.clientOrdersService.parameterIsNull(this.authenticatedUser.getEmail()) === true){
      this.notification = new ErrorNotification();
      this.notification.setMessage('Κάποιο πρόβλημα προέκυψε με το αίτημα σας. Αν το πρόβλημα παραμένει παρακαλούμε αποσυνδεθείτε και συνδεθείτε ξανά!');

      this.notificationService.updateNotificationData(this.notification);

      return;
    }



    // Call the service and get the Observable Response
    this.clientOrdersService.getClientOrders(this.authenticatedUser.email)
      .subscribe(
        ordersArrayFromResponse => {
          this.ordersArray = ordersArrayFromResponse;
          console.log('Orders Array length is: ' + this.ordersArray.length);
        },
        error => {
          this.notification = Object.assign(new ErrorNotification(), JSON.parse(error));
          console.log('Unsuccessful request!');
          console.log('Error getting the client addresses array from server follows: ' + this.notification.message);
          if (this.notification instanceof ErrorNotification) {
            console.log('Error Notification:: status ' + this.notification.status);
          }
          this.notificationService.updateNotificationData(this.notification);
        }
      );
  }


  public isClientHasOrders(): boolean {

    if(this.ordersArray) {
      if(this.ordersArray.length > 0) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  public returnOrderProductsArrayLegth(orderProducts: Array<OrderProduct>) {
    return orderProducts.length;
  }

  public onClickOrder(orderID: string) {
    this.router.navigate(['/account/orders', orderID]);
  }


  public onClickProducer(producerID: string) {
    this.router.navigate(['/producer', producerID]);
  }

  public formatDateToGreeceTimezone(dateString: string): Date {
    let newDate = new Date(dateString);
    newDate.setHours(newDate.getHours() + 2);
    return newDate;
  }

}

