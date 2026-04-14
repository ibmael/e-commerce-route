import { initFlowbite } from 'flowbite';
import { Component, computed, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly platform_Id = inject(PLATFORM_ID);
  logged = computed(() => this.authService.isLogged());

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform_Id)) {
      this.getCartCount();
      this.getWishlistCount();
      if (localStorage.getItem('freshToken')) {
        this.authService.isLogged.set(true);
      }
    }
    initFlowbite();
  }

  cartCount = computed(() => this.cartService.cartCount());
  wishCount = computed(() => this.wishlistService.wishCount());

  logOut(): void {
    this.authService.signOut();
  }

  getCartCount(): void {
    this.cartService.getCartData().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
      },
    });
  }

  getWishlistCount(): void {
    this.wishlistService.getWishlistItems().subscribe({
      next: (res: any) => {
        this.wishlistService.wishCount.set(res.count ?? res.data?.length ?? 0);
        this.wishlistService.wishlistIds.set(res.data?.map((item: any) => item.id) ?? []);
      },
    });
  }
}
