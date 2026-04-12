import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import e from 'express';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  step = signal<number>(1);

  email: FormControl = new FormControl('', [Validators.required, Validators.email]);

  code: FormControl = new FormControl('', [Validators.required]);

  password: FormControl = new FormControl('', [Validators.required]);

  submitEmail(event: Event): void {
    if (this.email.valid) {
      event.preventDefault();
      const data = {
        email: this.email.value,
      };
      this.authService.forgetPassword(data).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.step.set(2);
          }
        },
        error: (error) => {
          console.error('Verification failed', error);
        },
      });
    }
  }
  submitCode(event: Event): void {
    event.preventDefault();
    if (this.code.valid) {
      const data = {
        resetCode: this.code.value,
      };
      this.authService.verifyResetCode(data).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.step.set(3);
          }
        },
      });
    }
  }
  submitPassword(event: Event): void {
    event.preventDefault();
    if (this.password.valid) {
      const data = {
        email: this.email.value,
        newPassword: this.password.value,
      };
      this.authService.resetPassword(data).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.router.navigate(['/login']);
          }
        },
      });
    }
  }
}
