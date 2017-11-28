 export class OrderClientDetails {

   public clientID: string;

   public orderClientFirstName: string;

   public orderClientLastName: string;

   public orderClientEmail: string;

   public orderClientGender: string;

   public orderClientBirthDate: string;


   public printOrerClientDetails(): void {
     console.log('------Order Client Details------');
     console.log('clientID: ' + this.clientID);
     console.log('orderClientFirstName: ' + this.orderClientFirstName);
     console.log('orderClientLastName: ' + this.orderClientLastName);
     console.log('orderClientEmail: ' + this.orderClientEmail);
     console.log('orderClientGender: ' + this.orderClientGender);
     console.log('orderClientBirthDate: ' + this.orderClientBirthDate);
   }

 }
