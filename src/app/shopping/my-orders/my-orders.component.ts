import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/auth.service";
import { CheckoutService } from "../checkout.service";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent implements OnInit {
  orders;
  constructor(
    private authService: AuthService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.checkoutService
        .getOrdersByUser(user.uid)
        .valueChanges()
        .subscribe(orders => {
          this.orders = orders;
        });
    });
  }
}
