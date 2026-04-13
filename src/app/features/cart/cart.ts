import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartResponse } from './models/cart.interface';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);
  cartDetails = signal<CartResponse>({} as CartResponse);
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getCartData();
    }
  }

  getCartData(): void {
    this.cartService.getCartData().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails.set(res.data);
      },
    });
  }
  removeItem(id: string): void {
    this.cartService.removeFromCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res.data);
      },
    });
  }
  update(id: string, count: number): void {
    this.cartService.updateCount(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res.data);
      },
    });
  }
}
