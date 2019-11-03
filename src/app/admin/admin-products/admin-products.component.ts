import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator'
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Product } from './../../models/product'
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  
  subscription: Subscription;
  tableResource: DataTableResource<Product>
  items: Product[] = [];
  itemCount: number;


  // MatPaginator Output
  pageEvent: PageEvent;


  constructor(
    private router: Router,
    private productService: ProductService) {
    this.subscription = this.productService.getAll().snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })
    ).subscribe(products => {
      let to = products as Product[]
      let filteredProducts = this.products = to;
      this.initializeTable(to)

    });
  }



  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 }).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return
    this.tableResource.query(params)
      .then(items => this.items = items)
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p['title'].toLowerCase().includes(query.toLocaleLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
