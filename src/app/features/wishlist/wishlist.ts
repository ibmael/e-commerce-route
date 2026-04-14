import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly platformId = inject(PLATFORM_ID);

  wishlistItems = signal<Product[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getWishlistData();
    }
  }

  getWishlistData(): void {
    this.wishlistService.getWishlistItems().subscribe({
      next: (res: any) => {
        const items: Product[] = res.data ?? [];
        this.wishlistItems.set(items);
        this.wishlistService.wishCount.set(items.length);
        this.wishlistService.wishlistIds.set(items.map((item) => item.id));
      },
    });
  }

  removeItem(productId: string): void {
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res: any) => {
        const updatedItems = this.wishlistItems().filter((item) => item.id !== productId);
        this.wishlistItems.set(updatedItems);
        this.wishlistService.wishCount.set(updatedItems.length);
        this.wishlistService.wishlistIds.set(res.data ?? updatedItems.map((item) => item.id));
        this.toastrService.success(res.message ?? 'Item removed from wishlist', 'freshCart');
      },
    });
  }

  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res: any) => {
        this.cartService.cartCount.set(res.numOfCartItems ?? this.cartService.cartCount());
        this.toastrService.success(res.message ?? 'Product added to cart', 'freshCart');
      },
    });
  }
}
