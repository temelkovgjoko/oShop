import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$
  constructor(
    private router: Router,
    private productService: ProductService) {
    this.products$ = this.productService.getAll().snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })
    );
  }

  ngOnInit() {
  }

}
