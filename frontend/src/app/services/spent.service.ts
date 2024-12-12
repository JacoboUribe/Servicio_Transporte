import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Spent } from '../models/spent.model';

@Injectable({
  providedIn: 'root'
})
export class SpentService {

 constructor(private http: HttpClient) { }
  
    list(): Observable<Spent[]> {
      return this.http.get<Spent[]>(`${environment.url_ms_cinema}/spents`);
    }
    delete(id: number) {
      return this.http.delete<Spent>(
        `${environment.url_ms_cinema}/spents/${id}`
      );
    }
    view(id: number): Observable<Spent> {
      return this.http.get<Spent>(
        `${environment.url_ms_cinema}/spents/${id}`
      );
    }
    create(Spent: Spent): Observable<Spent> {
      delete Spent.id;
      return this.http.post<Spent>(
        `${environment.url_ms_cinema}/spents`,
        Spent
      );
    }
    update(Spent: Spent): Observable<Spent> {
      return this.http.put<Spent>(
        `${environment.url_ms_cinema}/spents/${Spent.id}`,
        Spent
      );
    }
}
