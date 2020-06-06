import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductFormComponent } from "./product-form/product-form.component";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { AuthGuardService } from "../shared/auth-guard.service";
import { AdminAuthGuardService } from "./admin-auth-guard.service";

const routes: Routes = [
  {
    path: "admin/products/new",
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: "admin/products/:id",
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: "admin/products",
    component: AdminProductsComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: "admin/orders",
    component: AdminOrdersComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouting {}
