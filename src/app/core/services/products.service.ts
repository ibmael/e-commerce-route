import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpclient = inject(HttpClient);

  getAllProducts(): Observable<any> {
    return this.httpclient.get(`${environment.BASE_URL}/api/v1/products`);
  }
  getSpecificProduct(productId: string): Observable<any> {
    return this.httpclient.get(`${environment.BASE_URL}/api/v1/products/${productId}`);
  }
}
