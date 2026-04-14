import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpclient = inject(HttpClient);
  getAllCategories(): Observable<any> {
    return this.httpclient.get(`${environment.BASE_URL}/api/v1/categories`);
  }
  getSubCategoriesOnCategory(id: string): Observable<any> {
    return this.httpclient.get(`${environment.BASE_URL}/api/v1/categories/${id}/subcategories`);
  }

  getSpecificSubCategoriesOnCategory(id: string): Observable<any> {
    return this.httpclient.get(`${environment.BASE_URL}/api/v1/subcategories/${id}`);
  }

  getSpecificCategory(id: string): Observable<any> {
    return this.httpclient.get(`${environment.BASE_URL}/api/v1/categories/${id}`);
  }
}
