import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleDriver } from '../models/vehicle-driver.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleDriverService {

 constructor(private http: HttpClient) { }
  
    list(): Observable<VehicleDriver[]> {
      return this.http.get<VehicleDriver[]>(`${environment.url_ms_cinema}/vehicle_drivers`);
    }
    delete(id: number) {
      return this.http.delete<VehicleDriver>(
        `${environment.url_ms_cinema}/vehicle_drivers/${id}`
      );
    }
    view(id: number): Observable<VehicleDriver> {
      return this.http.get<VehicleDriver>(
        `${environment.url_ms_cinema}/vehicle_drivers/${id}`
      );
    }
    create(VehicleDriver: VehicleDriver): Observable<VehicleDriver> {
      delete VehicleDriver.id;
      return this.http.post<VehicleDriver>(
        `${environment.url_ms_cinema}/vehicle_drivers`,
        VehicleDriver
      );
    }
    update(VehicleDriver: VehicleDriver): Observable<VehicleDriver> {
      return this.http.put<VehicleDriver>(
        `${environment.url_ms_cinema}/vehicle_drivers/${VehicleDriver.id}`,
        VehicleDriver
      );
    }
}
