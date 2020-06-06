import { Component, OnInit, OnDestroy } from "@angular/core";
import { map, switchMap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductService } from "../product.service";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[] = [];
  category;
  shoppingCart;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.subscription = this.shoppingCartService
      .getCart()
      .subscribe(results => {
        this.shoppingCart = results[1] ? results[1].payload.exportVal() : {};
      });
    this.populateProducts();
  }

  populateProducts() {
    this.productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        ),

        switchMap(products => {
          this.products = this.filteredProducts = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(queryParams => {
        this.category = queryParams.get("category");
        this.filteredProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
