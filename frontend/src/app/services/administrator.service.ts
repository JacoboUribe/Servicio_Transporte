import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from '../models/administrator.model';
  import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }
  
    list(): Observable<Administrator[]> {
      return this.http.get<Administrator[]>(`${environment.url_ms_cinema}/administrators`);
    }
    delete(id: number) {
      return this.http.delete<Administrator>(
        `${environment.url_ms_cinema}/administrators/${id}`
      );
    }
    view(id: number): Observable<Administrator> {
      return this.http.get<Administrator>(
        `${environment.url_ms_cinema}/administrators/${id}`
      );
    }
    create(Administrator: Administrator): Observable<Administrator> {
      delete Administrator.id;
      return this.http.post<Administrator>(
        `${environment.url_ms_cinema}/administrators`,
        Administrator
      );
    }
    update(Administrator: Administrator): Observable<Administrator> {
      return this.http.put<Administrator>(
        `${environment.url_ms_cinema}/administrators/${Administrator.id}`,
        Administrator
      );
    }
}
