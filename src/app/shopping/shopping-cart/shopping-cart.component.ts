import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  cart;
  shoppingCartItemCount;
  cartItems;
  productIds: any[];
  totalPrice;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.subscription = this.shoppingCartService
      .getCart()
      .pipe(
        map(data => {
          return data[1] ? data[1].payload.exportVal() : {};
        })
      )
      .subscribe(cartItems => {
        this.cartItems = cartItems;
        this.productIds = Object.keys(cartItems);

        this.shoppingCartItemCount = 0;
        this.totalPrice = 0;
        for (let productId in cartItems) {
          this.totalPrice +=
            cartItems[productId].product.price * cartItems[productId].quantity;
          this.shoppingCartItemCount += cartItems[productId].quantity;
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearCart() {
    this.shoppingCartService
      .clearCart()
      .then(res => {})
      .catch(error => {});
  }
}
