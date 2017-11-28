export abstract class AbstractNotification {
  constructor(
    public message?: string) {}

  getMessage() {
    return this.message;
  }

  setMessage(message: string) {
    this.message = message;
  }

}
