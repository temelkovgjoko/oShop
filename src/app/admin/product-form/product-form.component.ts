import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public categories$;
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = this.categoryService.getCategories().snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })
    )
  }

  save(product) {
    this.productService.create(product)
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() { }

}
