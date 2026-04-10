import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  productList = signal<Product[]>([]);

  ngOnInit(): void {
    this.getProductsData();
  }

  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.productList.set(response.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
