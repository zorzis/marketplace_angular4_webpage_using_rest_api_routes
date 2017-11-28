import {NgModule} from "@angular/core";
import {NotificationsControlComponent} from "./notificationsControlComponent.component";
import {NotificationComponent} from "./notificationComponent.component";
import {NotificationService} from "./notificationsSharedService.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    NotificationsControlComponent,
    NotificationComponent,
  ],
  providers: [
    NotificationService,
  ],
  exports: [
    NotificationsControlComponent,
    NotificationComponent,

  ],
})

export class NotificationsModule { }
