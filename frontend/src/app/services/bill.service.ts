import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {

   constructor(private http: HttpClient) { }
    
      list(): Observable<Bill[]> {
        return this.http.get<Bill[]>(`${environment.url_ms_cinema}/bills`);
      }
      delete(id: number) {
        return this.http.delete<Bill>(
          `${environment.url_ms_cinema}/bills/${id}`
        );
      }
      view(id: number): Observable<Bill> {
        return this.http.get<Bill>(
          `${environment.url_ms_cinema}/bills/${id}`
        );
      }
      create(Bill: Bill): Observable<Bill> {
        delete Bill.id;
        return this.http.post<Bill>(
          `${environment.url_ms_cinema}/bills`,
          Bill
        );
      }
      update(Bill: Bill): Observable<Bill> {
        return this.http.put<Bill>(
          `${environment.url_ms_cinema}/bills/${Bill.id}`,
          Bill
        );
      }
}
