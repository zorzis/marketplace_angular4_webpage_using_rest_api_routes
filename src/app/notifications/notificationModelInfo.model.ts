import {AbstractNotification} from './notificationModelAbstract.model';

export class InfoNotification extends AbstractNotification {
  constructor(
    public message?: string) {

    super(message);
  }

}
