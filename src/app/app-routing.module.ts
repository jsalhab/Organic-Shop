import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./core/login/login.component";
import { ProductsComponent } from "./shopping/products/products.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule {}
