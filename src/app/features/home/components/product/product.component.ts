import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
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

  addProduct(id: string): void {
    if (localStorage.getItem('freshToken')) {
      this.cartService.addProductToCart(id).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 'success') {
            this.toastrService.success(response.message, 'freshCart');
          }
        },
      });
    } else {
      this.toastrService.warning(`Please login first`, 'freshCart');
    }
  }
}
