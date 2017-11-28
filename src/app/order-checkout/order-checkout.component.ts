import {Component,OnDestroy, OnInit} from "@angular/core";


@Component({
  selector: 'cart-checkout-selector',
  templateUrl: './order-checkout.component.html',

})


export class OrderCheckoutComponent implements OnInit, OnDestroy{



  constructor() {
  }


  ngOnInit(): void {
    console.log('Hi There From ShopingCartComponent::OnInit');
  }

  ngOnDestroy(): void {
    console.log('Hi There From OrderCheckoutComponent::OnDestroy');
  }

}
