import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId()
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .pipe(
        map(x => new ShoppingCart(x['items'])))
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1)
  }

  async removeFromCard(product: Product) {
    this.updateItem(product, -1)
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId()
    this.db.object('/shopping-carts/' + cartId + '/items').remove()
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
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

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key)
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      let itemObject = { quantity: 0 }
      if (item) itemObject.quantity = item['quantity']
      let quantity = itemObject.quantity + change
      if (quantity === 0) item$.remove()
      else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      })
    })
  }
}
