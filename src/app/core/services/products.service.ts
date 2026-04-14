import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpclient = inject(HttpClient);

  getAllProducts(pageNumber: number = 1): Observable<any> {
    return this.httpclient.get(`${environment.BASE_URL}/api/v1/products?page=${pageNumber}`);
  }
  getSpecificProduct(productId: string): Observable<any> {
    return this.httpclient.get(`${environment.BASE_URL}/api/v1/products/${productId}`);
  }

  getProductsByCategory(categoryId: string): Observable<any> {
    return this.httpclient
      .get(`${environment.BASE_URL}/api/v1/products?category[in]=${categoryId}`)
      .pipe(
        catchError(() => this.httpclient.get(`${environment.BASE_URL}/api/v1/products?category=${categoryId}`)),
      );
  }
}
