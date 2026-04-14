import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../core/models/product.interface';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  private readonly cartService = inject(CartService);
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
}
