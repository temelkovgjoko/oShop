import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId)
  }
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId

    let result = await this.create()
    localStorage.setItem('cartId', result.key);
    return result.key
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1)
  }

  async removeFromCard(product: Product) {
    this.updateItemQuantity(product, -1)
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key)
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      let itemObject = { quantity: 0 }
      if (item) itemObject.quantity = item['quantity']
      item$.update({ product: product, quantity: itemObject.quantity + change })
    })
  }
}
