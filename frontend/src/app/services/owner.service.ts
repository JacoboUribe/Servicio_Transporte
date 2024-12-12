import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner } from '../models/owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }
   
     list(): Observable<Owner[]> {
       return this.http.get<Owner[]>(`${environment.url_ms_cinema}/owners`);
     }
     delete(id: number) {
       return this.http.delete<Owner>(
         `${environment.url_ms_cinema}/owners/${id}`
       );
     }
     view(id: number): Observable<Owner> {
       return this.http.get<Owner>(
         `${environment.url_ms_cinema}/owners/${id}`
       );
     }
     create(Owner: Owner): Observable<Owner> {
       delete Owner.id;
       return this.http.post<Owner>(
         `${environment.url_ms_cinema}/owners`,
         Owner
       );
     }
     update(Owner: Owner): Observable<Owner> {
       return this.http.put<Owner>(
         `${environment.url_ms_cinema}/owners/${Owner.id}`,
         Owner
       );
     }
}
