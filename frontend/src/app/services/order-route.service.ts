import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderRoute } from '../models/order-route.model';

@Injectable({
  providedIn: 'root'
})
export class order_routeservice {

   constructor(private http: HttpClient) { }
    
      list(): Observable<OrderRoute[]> {
        return this.http.get<OrderRoute[]>(`${environment.url_ms_cinema}/order_routes`);
      }
      delete(id: number) {
        return this.http.delete<OrderRoute>(
          `${environment.url_ms_cinema}/order_routes/${id}`
        );
      }
      view(id: number): Observable<OrderRoute> {
        return this.http.get<OrderRoute>(
          `${environment.url_ms_cinema}/order_routes/${id}`
        );
      }
      create(OrderRoute: OrderRoute): Observable<OrderRoute> {
        delete OrderRoute.id;
        return this.http.post<OrderRoute>(
          `${environment.url_ms_cinema}/order_routes`,
          OrderRoute
        );
      }
      update(OrderRoute: OrderRoute): Observable<OrderRoute> {
        return this.http.put<OrderRoute>(
          `${environment.url_ms_cinema}/order_routes/${OrderRoute.id}`,
          OrderRoute
        );
      }
}
