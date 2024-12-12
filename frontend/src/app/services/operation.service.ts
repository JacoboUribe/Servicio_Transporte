import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operation } from '../models/operation.model';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

 constructor(private http: HttpClient) { }
  
    list(): Observable<Operation[]> {
      return this.http.get<Operation[]>(`${environment.url_ms_cinema}/operations`);
    }
    delete(id: number) {
      return this.http.delete<Operation>(
        `${environment.url_ms_cinema}/operations/${id}`
      );
    }
    view(id: number): Observable<Operation> {
      return this.http.get<Operation>(
        `${environment.url_ms_cinema}/operations/${id}`
      );
    }
    create(Operation: Operation): Observable<Operation> {
      delete Operation.id;
      return this.http.post<Operation>(
        `${environment.url_ms_cinema}/operations`,
        Operation
      );
    }
    update(Operation: Operation): Observable<Operation> {
      return this.http.put<Operation>(
        `${environment.url_ms_cinema}/operations/${Operation.id}`,
        Operation
      );
    }
}
