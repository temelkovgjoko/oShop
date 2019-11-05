import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { UtilitesService } from 'src/app/utilites.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;
  constructor(categoryService: CategoryService, utilitiesService: UtilitesService) {
    this.categories$ = utilitiesService.converter(categoryService.getAll())
  }

  ngOnInit() {
  }

}
