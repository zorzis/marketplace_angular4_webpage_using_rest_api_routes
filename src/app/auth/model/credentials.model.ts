export class Credentials {
  constructor(
    public email: string,
    public password: string) {}


    public getEmail() {
      return this.email;
    }

    public setEmail(email: string) {
      this.email = email;
    }

    public getPassword() {
      return this.password;
    }

    public setPassword(password: string) {
      this.password = password;
    }
}
