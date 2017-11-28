import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractNotification} from './notificationModelAbstract.model';
import { NotificationService } from './notificationsSharedService.service';
import { NgZone } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';



@Component({
  selector: 'notifications-module',
  template: `    
          <notification-selector *ngFor="let notification of notificationsHistory" 
                                 (click)="closeNotification(notification)" 
                                 [notification]="notification">
            
            
          </notification-selector>
  `,
})


export class NotificationsControlComponent implements OnInit, OnDestroy {


  // the notification object type
  notification: AbstractNotification;

  // the container of the notifications
  notificationsHistory: Array<AbstractNotification> = [];

  private notificationTimerObservable: Subscription;
  private notificationSharedServiceObservable: Subscription;




  constructor(private notificationService: NotificationService,
              private zone: NgZone) {
    console.log('Hello From NotificationsControlComponent::CONSTRUCTOR');
  }


  ngOnInit() {
    console.log('Hi There From NotificationsControlComponent::OnInit');
    this.getNotificationDataFromSharedService();
  }

  ngOnDestroy(): void {
    console.log('Hi There From NotificationsControlComponent::OnDestroy');

    this.notificationSharedServiceObservable.unsubscribe();
    this.notificationTimerObservable.unsubscribe();
  }

  private getNotificationDataFromSharedService(): void {
    console.log('Hi From NotificationsControlComponent::getNotificationDataFromSharedService START');


    // the notification Component subscribes to observable
    // so it can refresh data every time a data change is commited
    const sharedServiceObservable = this.notificationService.getNotificationData();
    this.notificationSharedServiceObservable = sharedServiceObservable
      .subscribe(
        notification => {

          // check more details about NgZone and Router here:
          // http://stackoverflow.com/questions/36919399/angular-2-view-not-updating-after-model-changes
          this.zone.run(() => {

            // define the notification recieved from the shared notification service
            // as AbstractNotification data type and push it (add it)
            // to the notificationHistory array of AbstractNotifications Data
            this.notification = <AbstractNotification>notification;
            this.notificationsHistory.push(this.notification);

            console.log('Hi From NotificationsControlComponent::getNotificationDataFromSharedService');
            console.log('Notification to be displayed is: ' + this.notification.message);

            // close notifications removing notification from array bottom after some seconds
            this.closeNotificationsUsingTimeOutCallBack();
          });


        });
  }


  // we remove the notification from notifications array using an object and not position
  private closeNotification(notification: AbstractNotification) {
    console.log('Hello from notificationsControlComponent::closeNotification');
    this.notificationsHistory.splice(this.notificationsHistory.indexOf(notification), 1);
  }

  private closeNotificationsUsingTimeOutCallBack() {
    let timeout = setTimeout(() => {
      console.log('Hello from notificationsControlComponent::closeNotificationsUsingTimeOutCallBack()');
      if (this.notificationsHistory.length !== 0) {
        // when its time the first commited notification is removed
        this.notificationsHistory.splice(0, 1);
      }
    }, 10000);
  }


}
