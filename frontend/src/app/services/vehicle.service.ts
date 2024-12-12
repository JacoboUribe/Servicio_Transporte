import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class vehicleService {

  constructor(private http: HttpClient) { }
    
      list(): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(`${environment.url_ms_cinema}/vehicle`);
      }
      delete(id: number) {
        return this.http.delete<Vehicle>(
          `${environment.url_ms_cinema}/vehicle/${id}`
        );
      }
      view(id: number): Observable<Vehicle> {
        return this.http.get<Vehicle>(
          `${environment.url_ms_cinema}/vehicle/${id}`
        );
      }
      create(Vehicle: Vehicle): Observable<Vehicle> {
        delete Vehicle.id;
        return this.http.post<Vehicle>(
          `${environment.url_ms_cinema}/vehicle`,
          Vehicle
        );
      }
      update(Vehicle: Vehicle): Observable<Vehicle> {
        return this.http.put<Vehicle>(
          `${environment.url_ms_cinema}/vehicle/${Vehicle.id}`,
          Vehicle
        );
      }
}
