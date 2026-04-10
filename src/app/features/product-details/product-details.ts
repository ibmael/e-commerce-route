import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  productDetails = signal<Product>({} as Product);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      params.get('id');
      this.getProductDetails(params.get('id')!);
    });
  }
  getProductDetails(id: string): void {
    this.productsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        this.productDetails.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
