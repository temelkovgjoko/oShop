import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';
import { UtilitesService } from '../shared/services/utilites.service';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  public category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    utilitiesService: UtilitesService,
    private shoppingCartService: ShoppingCartService) {

    // GET PRODUCTS
    utilitiesService.converter(productService.getAll()).pipe(switchMap(products => {
      this.products = products as Product[];
      return route.queryParamMap;
    })).subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) : this.products;
    })

    // FILTER PRODUCTS BY CATEGORY
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => { this.cart = cart })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
