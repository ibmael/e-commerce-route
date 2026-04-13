import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartResponse } from './models/cart.interface';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails = signal<CartResponse>({} as CartResponse);
  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getCartData().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails.set(res.data);
      },
    });
  }
}
