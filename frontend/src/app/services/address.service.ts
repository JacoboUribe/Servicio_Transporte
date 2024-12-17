import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  list(): Observable<Address[]> {
    return this.http.get<Address[]>(`${environment.url_ms_cinema}/addresses`);
  }
  delete(id: number) {
    return this.http.delete<Address>(
      `${environment.url_ms_cinema}/addresses/${id}`
    );
  }
  view(id: number): Observable<Address> {
    return this.http.get<Address>(
      `${environment.url_ms_cinema}/addresses/${id}`
    );
  }
  create(Address: Address): Observable<Address> {
    delete Address.id;
    return this.http.post<Address>(
      `${environment.url_ms_cinema}/addresses`,
      Address
    );
  }
  update(Address: Address): Observable<Address> {
    return this.http.put<Address>(
      `${environment.url_ms_cinema}/addresses/${Address.id}`,
      Address
    );
  }
}
