import { initFlowbite } from 'flowbite';
import { Component, computed, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly platform_Id = inject(PLATFORM_ID);
  logged = computed(() => this.authService.isLogged());

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform_Id)) {
      if (localStorage.getItem('freshToken')) {
        this.authService.isLogged.set(true);
      }
    }
    initFlowbite();
  }
  logOut(): void {
    this.authService.signOut();
  }
}
