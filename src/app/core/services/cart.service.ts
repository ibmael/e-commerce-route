import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.BASE_URL}/api/v2/cart`, {
      productId: id,
    });
  }
}
