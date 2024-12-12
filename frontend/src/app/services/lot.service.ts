import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lot } from '../models/lot.model';

@Injectable({
  providedIn: 'root'
})
export class LotService {

 constructor(private http: HttpClient) { }
  
    list(): Observable<Lot[]> {
      return this.http.get<Lot[]>(`${environment.url_ms_cinema}/lots`);
    }
    delete(id: number) {
      return this.http.delete<Lot>(
        `${environment.url_ms_cinema}/lots/${id}`
      );
    }
    view(id: number): Observable<Lot> {
      return this.http.get<Lot>(
        `${environment.url_ms_cinema}/lots/${id}`
      );
    }
    create(Lot: Lot): Observable<Lot> {
      delete Lot.id;
      return this.http.post<Lot>(
        `${environment.url_ms_cinema}/lots`,
        Lot
      );
    }
    update(Lot: Lot): Observable<Lot> {
      return this.http.put<Lot>(
        `${environment.url_ms_cinema}/lots/${Lot.id}`,
        Lot
      );
    }
}
