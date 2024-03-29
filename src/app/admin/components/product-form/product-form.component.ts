import { Component, OnInit } from '@angular/core';

import { map, take } from 'rxjs/operators';

import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { UtilitesService } from 'shared/services/utilites.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public categories$;
  public product = {};
  id
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private utilities: UtilitesService) {
    this.categories$ = this.utilities.converter(this.categoryService.getAll())

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product)
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products'])
  }

  ngOnInit() { }

}
