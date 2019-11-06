import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  // private getCart(cartId: string) {
  //   return this.db.object('/shopping-carts/' + cartId)
  // }


  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId

    let result = await this.create()
    localStorage.setItem('cartId', result.key);
    return result.key
  }

  async addToCart(product: Product) {
    console.log(product)
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key)
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      console.log(item)
      if (item) {
        console.log('y')
        item$.update({ quantity: item['quantity'] + 1 })
      } else {
        console.log('n')
        item$.set({ product: product, quantity: 1 })
      }
    })
  }
}
