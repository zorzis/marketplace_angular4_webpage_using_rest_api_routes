import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractNotification} from './notificationModelAbstract.model';
import {ErrorNotification} from './notificationModelError.model';
import {SuccessNotification} from './notificationModelSuccess.model';
import {InfoNotification} from "./notificationModelInfo.model";


@Component({
  selector: 'notification-selector',
  template: `
    <div class="content">
      <div class="container-fluid">
        <div id="note" class="card col-xs-11 col-sm-4 animated fadeInDown" >
          <div class="{{cssDivStyle}}">
            
            <div class="container">
              
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>

              <span data-notify="icon" class="{{cssIconStyle}}"></span>
              <span data-notify="message">{{notification.message}}</span>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  `,
})


export class NotificationComponent  implements OnInit {


  cssDivStyle: string;
  cssIconStyle: string;

  @Input()
  notification: AbstractNotification;

  constructor() {
    console.log('Hi From NotificationComponent::constructor');

  }

  ngOnInit(): void {
    console.log('Hi From NotificationComponent::OnInit');

    this.checkNotificationType();
  }

  private checkNotificationType() {
    console.log('Hi From NotificationComponent::checkNotificationType');

    if (this.notification instanceof ErrorNotification) {
      console.log('Notification is instanseOf Error');

      this.cssDivStyle = 'alert alert-danger alert-with-icon';
      this.cssIconStyle = 'ti-face-sad';

    } else if (this.notification instanceof SuccessNotification) {
      console.log('Notification is instanseOf Success');

      this.cssDivStyle = 'alert alert-success alert-with-icon';
      this.cssIconStyle = 'ti-face-smile';

    } else if (this.notification instanceof InfoNotification) {
      console.log('Notification is is instanseOf Info ');

      this.cssDivStyle = 'alert alert-info alert-with-icon';
      this.cssIconStyle = 'ti-info';
    }
  }
}


