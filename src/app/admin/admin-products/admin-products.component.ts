import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../../shopping/product.service";
import { map } from "rxjs/operators";
import { Subscription } from "rxjs";
import { Product } from "../../models/product.model";
import { DataTableResource } from "angular7-data-table";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  items = [];
  itemCount: number;
  subscription: Subscription;
  tableResource: DataTableResource<any>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subscription = this.productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(products => {
        this.filteredProducts = this.products = products;
        // this.initilizaTable(products);
      });
  }

  // private initilizaTable(products) {
  //   this.tableResource = new DataTableResource(products);
  //   this.tableResource.query({ offset: 0 }).then(items => {
  //     this.items = items;
  //   });
  //   this.tableResource.count().then(count => {
  //     this.itemCount = count;
  //   });
  // }

  // reloadItems(params) {
  //   if (!this.tableResource) return;
  //   this.tableResource.query(params).then(items => {
  //     this.items = items;
  //   });
  // }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
