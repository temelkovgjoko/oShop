import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map, take } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public categories$;
  product = {};
  id
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = this.categoryService.getCategories().snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })
    )

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product)
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  ngOnInit() { }

}