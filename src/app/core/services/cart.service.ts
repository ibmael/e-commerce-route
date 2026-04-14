import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  cartCount = signal<number>(0);

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.BASE_URL}/api/v2/cart`, {
      productId: id,
    });
  }
  getCartData(): Observable<any> {
    return this.httpClient.get(`${environment.BASE_URL}/api/v2/cart`);
  }
  updateCount(id: string, countNumber: number): Observable<any> {
    return this.httpClient.put(`${environment.BASE_URL}/api/v2/cart/${id}`, {
      count: countNumber,
    });
  }
  removeFromCart(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.BASE_URL}/api/v2/cart/${id}`);
  }
}
