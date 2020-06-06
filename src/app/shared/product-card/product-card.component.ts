import { Component, OnInit, Input } from "@angular/core";
import { ShoppingCartService } from "../../shopping/shopping-cart.service";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"]
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  @Input() showActions = true;
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
}
