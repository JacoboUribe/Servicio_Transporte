import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

 constructor(private http: HttpClient) { }
  
    list(): Observable<Route[]> {
      return this.http.get<Route[]>(`${environment.url_ms_cinema}/routes`);
    }
    delete(id: number) {
      return this.http.delete<Route>(
        `${environment.url_ms_cinema}/routes/${id}`
      );
    }
    view(id: number): Observable<Route> {
      return this.http.get<Route>(
        `${environment.url_ms_cinema}/routes/${id}`
      );
    }
    create(Route: Route): Observable<Route> {
      delete Route.id;
      return this.http.post<Route>(
        `${environment.url_ms_cinema}/routes`,
        Route
      );
    }
    update(Route: Route): Observable<Route> {
      return this.http.put<Route>(
        `${environment.url_ms_cinema}/routes/${Route.id}`,
        Route
      );
    }
}
