import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  cartId = signal<string>('');
  flag = signal<string>('cash');

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
    if (this.checkOut.valid) {
      if (this.flag() === 'cash') {
        console.log('cash');
      } else {
        console.log('visa');
      }
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
