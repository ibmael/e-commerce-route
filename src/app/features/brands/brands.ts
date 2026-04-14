import { Component, inject, OnInit, signal } from '@angular/core';
import { Brand } from '../cart/models/cart.interface';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.css',
})
export class Brands implements OnInit {
  private readonly brandsService = inject(BrandsService);
  brandsList = signal<Brand[]>([]);

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res: any) => {
        this.brandsList.set(res.data);
      },
    });
  }
}
