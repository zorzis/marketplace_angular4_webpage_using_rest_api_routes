import {OrderProduct} from "./order-product.model";
import {Client} from "./client.model";
import {Producer} from "./producer.model";
import {OrderClientDetails} from "./order-client-details.model";
import {OrderProducerDetails} from "./order-producer-details.model";
import {OrderClientAddressDetails} from "./order-client-address-details.model";
import {OrderProducerAddressDetails} from "./order-producer-addres-details.model";
import {OrderStatusCode} from "./order-status-code.model";
import {PaymentMethod} from "./payment-method.model";
import {Payment} from "./payment.model";

export class Order {

  public orderID: string;

  public dateOrderPlaced: string;

  public dateOrderPaid: string;

  public totalOrderPrice: number;

  public totalProductsTax: number;

  public totalProcessorTax: number;

  private totalShippingTax: number;

  private subTotalOrderPrice: number;

  public otherOrderDetails: string;

  public orderPayment: Payment;

  public orderProducts: Array<OrderProduct> ;

  public client: Client;

  public producer: Producer;

  public clientDetails: OrderClientDetails;

  public producerDetails: OrderProducerDetails;

  public clientAddressDetails: OrderClientAddressDetails;

  public producerAddressDetails: OrderProducerAddressDetails;

  public orderStatusCode: OrderStatusCode;



}
