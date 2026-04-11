import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Catrgory } from '../../../../core/models/catrgory.interface';

@Component({
  selector: 'app-category-home',
  imports: [],
  templateUrl: './category-home.component.html',
  styleUrl: './category-home.component.css',
})
export class CategoryHomeComponent implements OnInit {
  ngOnInit(): void {
    this.getCategoriesData();
  }
  private readonly categoriesService = inject(CategoriesService);
  catigoriesList = signal<Catrgory[]>([]);
  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.catigoriesList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
