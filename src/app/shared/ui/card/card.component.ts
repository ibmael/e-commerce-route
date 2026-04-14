import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/product.interface';
import { WishlistService } from '../../../core/services/wish-list.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  product = input.required<Product>();
  addProduct(id: string): void {
    if (localStorage.getItem('freshToken')) {
      this.cartService.addProductToCart(id).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 'success') {
            this.cartService.cartCount.set(response.numOfCartItems);
            this.toastrService.success(response.message, 'freshCart');
          }
        },
      });
    } else {
      this.toastrService.warning(`Please login first`, 'freshCart');
    }
  }

  addToWishlist(id: string): void {
    if (localStorage.getItem('freshToken')) {
      this.wishlistService.addProuctToWishlist(id).subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            this.wishlistService.wishlistIds.set(response.data ?? []);
            this.wishlistService.wishCount.set(
              response.data?.length ?? this.wishlistService.wishCount(),
            );
            this.toastrService.success(response.message, 'freshCart');
          }
        },
      });
    } else {
      this.toastrService.warning(`Please login first`, 'freshCart');
    }
  }

  isInWishlist(id: string): boolean {
    return this.wishlistService.wishlistIds().includes(id);
  }
}
