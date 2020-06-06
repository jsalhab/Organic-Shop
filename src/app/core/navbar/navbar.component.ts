import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AppUser } from "../../models/user.model";
import { AuthService } from "../../shared/auth.service";
import { ShoppingCartService } from "../../shopping/shopping-cart.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  subscription: Subscription;
  shoppingCartItemCount: number;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.authService.appUser$.subscribe(appUser => (this.appUser = appUser));

    this.subscription = this.shoppingCartService
      .getCart()
      .pipe(
        map(data => {
          return data[1] ? data[1].payload.exportVal() : {};
        })
      )
      .subscribe(cartItems => {
        this.shoppingCartItemCount = 0;
        for (let productId in cartItems) {
          this.shoppingCartItemCount += cartItems[productId].quantity;
        }
      });
  }

  logout() {
    this.authService.logout();
  }
}
