import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 constructor(private http: HttpClient) { }
  
    list(): Observable<Product[]> {
      return this.http.get<Product[]>(`${environment.url_ms_cinema}/products`);
    }
    delete(id: number) {
      return this.http.delete<Product>(
        `${environment.url_ms_cinema}/products/${id}`
      );
    }
    view(id: number): Observable<Product> {
      return this.http.get<Product>(
        `${environment.url_ms_cinema}/products/${id}`
      );
    }
    create(Product: Product): Observable<Product> {
      delete Product.id;
      return this.http.post<Product>(
        `${environment.url_ms_cinema}/products`,
        Product
      );
    }
    update(Product: Product): Observable<Product> {
      return this.http.put<Product>(
        `${environment.url_ms_cinema}/products/${Product.id}`,
        Product
      );
    }}
