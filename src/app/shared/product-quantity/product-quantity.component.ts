import { Component, OnInit, Input } from "@angular/core";
import { ShoppingCartService } from "../../shopping/shopping-cart.service";

@Component({
  selector: "app-product-quantity",
  templateUrl: "./product-quantity.component.html",
  styleUrls: ["./product-quantity.component.css"]
})
export class ProductQuantityComponent implements OnInit {
  @Input() product;
  @Input() shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {}

  getQuantity() {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart[this.product.key];
    return item ? item.quantity : 0;
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }
}
