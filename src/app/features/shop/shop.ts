import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';
import { CardComponent } from '../../shared/ui/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-shop',
  imports: [CardComponent, NgxPaginationModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  private readonly productsService = inject(ProductsService);
  pageSize = signal<number>(0);
  cp = signal<number>(0);
  total = signal<number>(0);

  productList = signal<Product[]>([]);

  ngOnInit(): void {
    this.getAllProducts();
  }
  pageChange(pageNumber: number): void {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data);
        this.pageSize.set(res.metadata.limit);
        this.cp.set(res.metadata.currentPage);
        this.total.set(res.results);
      },
    });
  }
  getAllProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.productList.set(res.data);
        this.pageSize.set(res.metadata.limit);
        this.cp.set(res.metadata.currentPage);
        this.total.set(res.results);
      },
    });
  }
}
