import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.css',
})
export class AllOrders implements OnInit {
  private readonly cartService = inject(CartService);

  ordersList = signal<any[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    const token = localStorage.getItem('freshToken');
    if (!token) {
      this.isLoading.set(false);
      return;
    }

    const userId = this.getUserIdFromToken(token);
    if (!userId) {
      this.isLoading.set(false);
      return;
    }

    this.cartService.getUserOrders(userId).subscribe({
      next: (res: any) => {
        this.ordersList.set(res ?? []);
        this.isLoading.set(false);
      },
      error: () => {
        this.ordersList.set([]);
        this.isLoading.set(false);
      },
    });
  }

  private getUserIdFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return payload.id ?? payload.userId ?? null;
    } catch {
      return null;
    }
  }
}
