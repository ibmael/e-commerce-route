import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  cartId = signal<string>('');
  flag = signal<string>('cash');
  isSubmitting = signal<boolean>(false);

  ngOnInit(): void {
    this.getCartId();
  }
  getCartId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      this.cartId.set(params.get('id')!);
    });
  }

  submitForm(): void {
    if (this.checkOut.invalid || !this.cartId()) {
      this.checkOut.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    if (this.flag() === 'cash') {
      this.cartService.createCashOrder(this.cartId(), this.checkOut.value).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.router.navigate(['/all-orders']);
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
    } else {
      this.cartService.createVisaOrder(this.cartId(), this.checkOut.value).subscribe({
        next: (res) => {
          this.isSubmitting.set(false);
          if (res.status === 'success') {
            window.open(res.session.url, '_self');
          }
        },
        error: () => {
          this.isSubmitting.set(false);
        },
      });
    }
  }
  changeFlag(el: HTMLInputElement): void {
    this.flag.set(el.value);
  }

  checkOut: FormGroup = this.formBuilder.group({
    shippingAddress: this.formBuilder.group({
      details: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
    }),
  });
}
