import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { ProductsComponent } from "./products/products.component";
import { AuthGuardService } from "../shared/auth-guard.service";

const routes: Routes = [
  { path: "", component: ProductsComponent },
  { path: "products", component: ProductsComponent },
  { path: "shopping-cart", component: ShoppingCartComponent },
  {
    path: "check-out",
    component: CheckOutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "order-success/:id",
    component: OrderSuccessComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "my/orders",
    component: MyOrdersComponent,
    canActivate: [AuthGuardService]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRouting {}
