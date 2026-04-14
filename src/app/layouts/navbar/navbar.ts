import { initFlowbite } from 'flowbite';
import { Component, computed, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly platform_Id = inject(PLATFORM_ID);
  logged = computed(() => this.authService.isLogged());

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform_Id)) {
      this.getCartCount();
      if (localStorage.getItem('freshToken')) {
        this.authService.isLogged.set(true);
      }
    }
    initFlowbite();
  }

  cartCount = computed(() => this.cartService.cartCount());

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
}
