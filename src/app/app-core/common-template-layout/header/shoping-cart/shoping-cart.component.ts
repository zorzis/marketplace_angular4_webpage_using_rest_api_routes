import {Component, OnDestroy, OnInit, NgZone} from "@angular/core";
import {ShopingCartService} from "../../../../shoping-cart-shared-service.service";
import {ShopingCart} from "../../../../model/shoping-cart.model";
import {Subscription} from "rxjs/Subscription";
import {ShoppingCartItem} from "../../../../model/shoping-cart-item.model";
import {Router} from "@angular/router";


@Component({
  selector: 'shoping-cart-selector',
  templateUrl: './shoping-cart.component.html',

})



export class ShopingCartComponent implements OnInit, OnDestroy {

  private cart: ShopingCart;
  private shoppingCartSharedServiceObservable: Subscription;
  private cartItemsCounter: number;


  constructor(private shopingCartSharedService: ShopingCartService,
              private router: Router,
              private zone: NgZone) {

    console.log('Hello From ShopingCartComponent::CONSTRUCTOR');
    this.cart = this.shopingCartSharedService.getShoppingCartFromMemory();
    this.cartItemsCounter = this.shopingCartSharedService.countCartItems();

  }

  ngOnInit() {
    console.log('Hi There From ShopingCartComponent::OnInit');
    this.getShoppingCartFromSharedService();
  }

  ngOnDestroy(): void {
    console.log('Hi There From ShopingCartComponent::OnDestroy');
    this.shoppingCartSharedServiceObservable.unsubscribe();
  }



  private getShoppingCartFromSharedService(): void {
    console.log('Hi From ShopingCartComponent::getShoppingCartFromSharedService() START');
    const sharedServiceObservable = this.shopingCartSharedService.getShoppingCartObservable();
    this.shoppingCartSharedServiceObservable = sharedServiceObservable
      .subscribe(
        cartFromSharedService => {
          this.zone.run(() => {
            this.cart = <ShopingCart>cartFromSharedService;
            if(this.cart) {
              this.cartItemsCounter = this.shopingCartSharedService.countCartItems();
              console.log('Hello from ShoppingCartComponent. Items in the Cart are: ' + this.shopingCartSharedService.countCartItems());
            }
          });
        });
  }


  public removeItem(item: ShoppingCartItem): void {
    this.shopingCartSharedService.removeItemFromCart(item);
  }


  public proceedToNewOrder(): void {
    this.router.navigateByUrl('/order');
  }
}
