import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehicleOwner } from '../models/vehicle-owner.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleOwnerService {

  constructor(private http: HttpClient) { }
    
      list(): Observable<VehicleOwner[]> {
        return this.http.get<VehicleOwner[]>(`${environment.url_ms_cinema}/vehicle_owners`);
      }
      delete(id: number) {
        return this.http.delete<VehicleOwner>(
          `${environment.url_ms_cinema}/vehicle_owners/${id}`
        );
      }
      view(id: number): Observable<VehicleOwner> {
        return this.http.get<VehicleOwner>(
          `${environment.url_ms_cinema}/vehicle_owners/${id}`
        );
      }
      create(VehicleOwner: VehicleOwner): Observable<VehicleOwner> {
        delete VehicleOwner.id;
        return this.http.post<VehicleOwner>(
          `${environment.url_ms_cinema}/vehicle_owners`,
          VehicleOwner
        );
      }
      update(VehicleOwner: VehicleOwner): Observable<VehicleOwner> {
        return this.http.put<VehicleOwner>(
          `${environment.url_ms_cinema}/vehicle_owners/${VehicleOwner.id}`,
          VehicleOwner
        );
      }
}
