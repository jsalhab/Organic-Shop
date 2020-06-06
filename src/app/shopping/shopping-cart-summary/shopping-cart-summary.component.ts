import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-shopping-cart-summary",
  templateUrl: "./shopping-cart-summary.component.html",
  styleUrls: ["./shopping-cart-summary.component.css"]
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input() shoppingCart;
  shoppingCartItemCount;
  productIds;

  constructor() {}

  ngOnInit() {
    if (this.shoppingCart) {
      this.productIds = Object.keys(this.shoppingCart);
      this.totalItemsCount();
      this.totalPrice();
    }
  }

  totalPrice() {
    let sum = 0;
    for (let productId in this.shoppingCart)
      sum +=
        this.shoppingCart[productId].product.price *
        this.shoppingCart[productId].quantity;
    return sum;
  }

  totalItemsCount() {
    this.shoppingCartItemCount = 0;
    for (let productId in this.shoppingCart) {
      this.shoppingCartItemCount += this.shoppingCart[productId].quantity;
    }
    return this.shoppingCartItemCount;
  }
}
