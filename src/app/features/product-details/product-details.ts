import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wish-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly platformId = inject(PLATFORM_ID);

  productDetails = signal<Product>({} as Product);
  selectedImage = signal<string>('');
  quantity = signal<number>(1);
  inWishlist = computed(() => this.wishlistService.wishlistIds().includes(this.productDetails().id));

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.getProductDetails(params.get('id')!);
    });
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('freshToken')) {
      this.syncWishlistState();
    }
  }

  getProductDetails(id: string): void {
    this.productsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        this.productDetails.set(res.data);
        this.selectedImage.set(res.data.imageCover);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  syncWishlistState(): void {
    this.wishlistService.getWishlistItems().subscribe({
      next: (res: any) => {
        this.wishlistService.wishlistIds.set(res.data?.map((item: Product) => item.id) ?? []);
        this.wishlistService.wishCount.set(res.count ?? res.data?.length ?? 0);
      },
    });
  }

  selectImage(image: string): void {
    this.selectedImage.set(image);
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((count) => count - 1);
    }
  }

  increaseQuantity(): void {
    this.quantity.update((count) => count + 1);
  }

  addToCart(productId: string): void {
    if (!localStorage.getItem('freshToken')) {
      this.toastrService.warning(`Please login first`, 'freshCart');
      return;
    }

    this.cartService.addProductToCart(productId).subscribe({
      next: (res: any) => {
        this.cartService.cartCount.set(res.numOfCartItems ?? this.cartService.cartCount());
        this.toastrService.success(res.message ?? 'Product added to cart', 'freshCart');
      },
    });
  }

  addToWishlist(productId: string): void {
    if (!localStorage.getItem('freshToken')) {
      this.toastrService.warning(`Please login first`, 'freshCart');
      return;
    }

    this.wishlistService.addProuctToWishlist(productId).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.wishlistService.wishlistIds.set(response.data ?? []);
          this.wishlistService.wishCount.set(response.data?.length ?? this.wishlistService.wishCount());
          this.toastrService.success(response.message ?? 'Added to wishlist', 'freshCart');
        }
      },
    });
  }
}
