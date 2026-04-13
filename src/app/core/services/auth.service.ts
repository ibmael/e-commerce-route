import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  isLogged = signal<boolean>(false);

  signUp(data: object): Observable<any> {
    return this.httpClient.post(`${environment.BASE_URL}/api/v1/auth/signup`, data);
  }
  signIn(data: object): Observable<any> {
    return this.httpClient.post(`${environment.BASE_URL}/api/v1/auth/signin`, data);
  }
  forgetPassword(data: object): Observable<any> {
    return this.httpClient.post(`${environment.BASE_URL}/api/v1/auth/forgotPasswords`, data);
  }
  verifyResetCode(data: object): Observable<any> {
    return this.httpClient.post(`${environment.BASE_URL}/api/v1/auth/verifyResetCode`, data);
  }
  resetPassword(data: object): Observable<any> {
    return this.httpClient.put(`${environment.BASE_URL}/api/v1/auth/resetPassword`, data);
  }
}
