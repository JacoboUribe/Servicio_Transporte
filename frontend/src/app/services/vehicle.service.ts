import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) {}

  //observable es una clase que permite manejar eventos asincronos
  list(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.url_ms_cinema}/vehicles`);
  }

  view(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(
      `${environment.url_ms_cinema}/vehicles/${id}`
    );
  }

  delete(id: number) {
    return this.http.delete<Vehicle>(
      `${environment.url_ms_cinema}/vehicles/${id}`
    );
  }

  create(Vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(
      `${environment.url_ms_cinema}/vehicles`,
      Vehicle
    );
  }
  //en la proxima clase colocamos el interceptor

  update(Vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(
      `${environment.url_ms_cinema}/vehicles/${Vehicle.id}`,
      Vehicle
    );
  }
}
