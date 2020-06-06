import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Product } from "../models/product.model";
import { take, map } from "rxjs/operators";

@Injectable()
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list("/shopping-cart").push({
      dateCreated: new Date().getTime()
    });
  }

  getCart() {
    let cardId = this.getOrCreateCartId();
    return this.db.list("/shopping-cart/" + cardId).snapshotChanges();
  }

  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-cart/" + cartId + "/items").remove();
  }

  private getOrCreateCartId() {
    let cardId = localStorage.getItem("cardId");
    if (!cardId) {
      this.create().then(result => {
        localStorage.setItem("cardId", result.key);
        return result.key;
      });
    } else {
      return cardId;
    }
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-cart/" + cartId + "/items/" + productId);
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(item => {
        if (item.payload.exists()) {
          let quantity = item.payload.exportVal().quantity + change;
          if (quantity === 0) item$.remove();
          else
            item$.update({
              product: product,
              quantity: quantity
            });
        } else {
          item$.set({ product: product, quantity: 1 });
        }
      });
  }
}
