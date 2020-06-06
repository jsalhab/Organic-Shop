import { Component, OnInit } from "@angular/core";
import { CheckoutService } from "../../shopping/checkout.service";

@Component({
  selector: "app-admin-orders",
  templateUrl: "./admin-orders.component.html",
  styleUrls: ["./admin-orders.component.css"]
})
export class AdminOrdersComponent implements OnInit {
  orders;
  constructor(private checkoutService: CheckoutService) {
    this.checkoutService
      .getOrders()
      .snapshotChanges()
      .subscribe(orders => {
        this.orders = orders;
      });
  }

  ngOnInit() {}
}
