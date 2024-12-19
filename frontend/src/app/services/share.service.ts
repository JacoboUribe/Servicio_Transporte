import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Share } from '../models/share.model';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private http: HttpClient) { }

  list(): Observable<Share[]> {
    return this.http.get<Share[]>(`${environment.url_ms_cinema}/shares`);
  }
  listByContract(contractId:number): Observable<Share[]>{
    return this.http.get<Share[]>(`${environment.url_ms_cinema}/shares?contract_id=${contractId}`)
  }
  delete(id: number) {
    return this.http.delete<Share>(
      `${environment.url_ms_cinema}/shares/${id}`
    );
  }
  view(id: number): Observable<Share> {
    return this.http.get<Share>(
      `${environment.url_ms_cinema}/shares/${id}`
    );
  }
  create(Share: Share): Observable<Share> {
    delete Share.id;
    return this.http.post<Share>(
      `${environment.url_ms_cinema}/shares`,
      Share
    );
  }
  update(Share: Share): Observable<Share> {
    return this.http.put<Share>(
      `${environment.url_ms_cinema}/shares/${Share.id}`,
      Share
    );
  }

}
