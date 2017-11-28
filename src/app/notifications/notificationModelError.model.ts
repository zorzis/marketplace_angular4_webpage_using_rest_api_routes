import {AbstractNotification} from './notificationModelAbstract.model';

export class ErrorNotification extends AbstractNotification {
  constructor(
    public status?: number,
    public message?: string,
    public code?: number,
    public developersMessages = [],
    public link?: string) {

    super(message);
  }

    public getStatus() {
      return this.status;
    }

    public setStatus(status: number) {
      this.status = status;
    }

    getCode() {
      return this.code;
    }

    setCode(code: number) {
      this.code = code;
    }

    getDevelopersMessage() {
      return this.developersMessages;
    }

    setDevelopersMessage(developersMessages = []) {
      this.developersMessages = developersMessages;
    }

    getLink() {
      return this.link;
    }

    setLink(link: string) {
      this.link = link;
    }
}
