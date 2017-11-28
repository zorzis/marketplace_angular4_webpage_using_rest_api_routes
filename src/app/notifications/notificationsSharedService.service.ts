import {Injectable, NgZone} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {AbstractNotification} from './notificationModelAbstract.model';

@Injectable()
export class NotificationService {
  // Observable notification sources
  private notificationObservableSource = new Subject();

  // Observable notification streams
  private notification$ = this.notificationObservableSource.asObservable();

  getNotificationData() {
    console.log('Hello from NotificationService::getNotificationData() => Notification is: ' + this.notification$);
    return this.notification$;
  }

  updateNotificationData(data: any) {
    console.log('Hello from Notification.service::updateNotification =>Data to be updated is: ' + <AbstractNotification>data.message);

    this.notificationObservableSource.next(data);
  }
}
