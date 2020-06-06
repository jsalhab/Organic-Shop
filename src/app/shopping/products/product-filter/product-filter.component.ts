import { Component, OnInit, Input } from "@angular/core";
import { map } from "rxjs/operators";
import { CategoryService } from "../../category.service";

@Component({
  selector: "app-product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.css"]
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input() category;
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService
      .getAll()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(categories => {
        this.categories$ = categories;
      });
  }
}
