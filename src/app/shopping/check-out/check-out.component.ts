import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/auth.service";
import { CheckoutService } from "../checkout.service";
import { Order } from "../../models/order.model";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.css"]
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  shoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.cartSubscription = await this.shoppingCartService
      .getCart()
      .subscribe(results => {
        this.shoppingCart = results[1] ? results[1].payload.exportVal() : {};
      });
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid;
    });
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.shoppingCart);
    let result = await this.checkoutService.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }
}
