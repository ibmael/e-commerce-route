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
}
