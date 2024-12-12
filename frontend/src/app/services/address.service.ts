import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class Addreesseservice {
  constructor(private http: HttpClient) { }

  list(): Observable<Address[]> {
    return this.http.get<Address[]>(`${environment.url_ms_cinema}/addreesses`);
  }
  delete(id: number) {
    return this.http.delete<Address>(
      `${environment.url_ms_cinema}/addreesses/${id}`
    );
  }
  view(id: number): Observable<Address> {
    return this.http.get<Address>(
      `${environment.url_ms_cinema}/addreesses/${id}`
    );
  }
  create(Address: Address): Observable<Address> {
    delete Address.id;
    return this.http.post<Address>(
      `${environment.url_ms_cinema}/addreesses`,
      Address
    );
  }
  update(Address: Address): Observable<Address> {
    return this.http.put<Address>(
      `${environment.url_ms_cinema}/addreesses/${Address.id}`,
      Address
    );
  }
}
