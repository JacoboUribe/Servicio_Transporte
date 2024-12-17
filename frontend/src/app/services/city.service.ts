import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  list(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.url_ms_cinema}/cities`);
  }
  delete(id: number) {
    return this.http.delete<City>(
      `${environment.url_ms_cinema}/cities/${id}`
    );
  }
  view(id: number): Observable<City> {
    return this.http.get<City>(
      `${environment.url_ms_cinema}/cities/${id}`
    );
  }
  create(City: City): Observable<City> {
    delete City.id;
    return this.http.post<City>(
      `${environment.url_ms_cinema}/cities`,
      City
    );
  }
  update(City: City): Observable<City> {
    return this.http.put<City>(
      `${environment.url_ms_cinema}/cities/${City.id}`,
      City
    );
  }
}
