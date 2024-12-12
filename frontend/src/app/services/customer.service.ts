import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 constructor(private http: HttpClient) { }
  
    list(): Observable<Customer[]> {
      return this.http.get<Customer[]>(`${environment.url_ms_cinema}/customers`);
    }
    delete(id: number) {
      return this.http.delete<Customer>(
        `${environment.url_ms_cinema}/customers/${id}`
      );
    }
    view(id: number): Observable<Customer> {
      return this.http.get<Customer>(
        `${environment.url_ms_cinema}/customers/${id}`
      );
    }
    create(Customer: Customer): Observable<Customer> {
      delete Customer.id;
      return this.http.post<Customer>(
        `${environment.url_ms_cinema}/customers`,
        Customer
      );
    }
    update(Customer: Customer): Observable<Customer> {
      return this.http.put<Customer>(
        `${environment.url_ms_cinema}/customers/${Customer.id}`,
        Customer
      );
    }
}
