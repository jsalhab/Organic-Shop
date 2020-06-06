import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AppComponent } from "./app.component";
import { AuthService } from "./shared/auth.service";
import { AuthGuardService } from "./shared/auth-guard.service";
import { UserService } from "./shared/user.service";
import { AdminAuthGuardService } from "./admin/admin-auth-guard.service";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "./shared/shared.module";
import { AdminModule } from "./admin/admin.module";
import { ShoppingModule } from "./shopping/shopping.module";
import { CoreModule } from "./core/core.module";
import { ShoppingCartService } from "./shopping/shopping-cart.service";
import { CategoryService } from "./shopping/category.service";
import { ProductService } from "./shopping/product.service";
import { CheckoutService } from "./shopping/checkout.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule
  ],

  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    CheckoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
