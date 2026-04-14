import { Component, inject, OnInit, signal } from '@angular/core';
import { Catrgory } from '../../core/models/catrgory.interface';
import { Product } from '../../core/models/product.interface';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { CardComponent } from '../../shared/ui/card/card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);

  categoriesList = signal<Catrgory[]>([]);
  relatedProducts = signal<Product[]>([]);
  selectedCategory = signal<Catrgory | null>(null);
  isProductsLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getCategoriesData();
  }

  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res: any) => {
        const categories: Catrgory[] = res.data ?? [];
        this.categoriesList.set(categories);
        if (categories.length > 0) {
          this.onCategorySelect(categories[0]);
        }
      },
    });
  }

  onCategorySelect(category: Catrgory): void {
    this.selectedCategory.set(category);
    this.isProductsLoading.set(true);

    this.productsService.getProductsByCategory(category._id).subscribe({
      next: (res: any) => {
        this.relatedProducts.set(res.data ?? []);
        this.isProductsLoading.set(false);
      },
      error: () => {
        this.relatedProducts.set([]);
        this.isProductsLoading.set(false);
      },
    });
  }
}
