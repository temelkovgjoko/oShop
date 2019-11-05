import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { UtilitesService } from '../utilites.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  public category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    utilitiesService: UtilitesService) {
    // GET PRODUCTS
    utilitiesService.converter(productService.getAll())
      .subscribe(products => { this.products = products as Product[] })
    // FILTER PRODUCTS BY CATEGORY
    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) : this.products;
    })

    // GET CATEGORIES

  }
}
