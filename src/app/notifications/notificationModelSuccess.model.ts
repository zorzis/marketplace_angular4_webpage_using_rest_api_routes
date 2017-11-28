import {AbstractNotification} from './notificationModelAbstract.model';

export class SuccessNotification extends AbstractNotification {
  constructor(
    public message?: string) {

    super(message);
  }

}
