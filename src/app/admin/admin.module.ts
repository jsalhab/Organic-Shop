import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AdminRouting } from "./admin-routing.module";

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule, AdminRouting]
})
export class AdminModule {}
