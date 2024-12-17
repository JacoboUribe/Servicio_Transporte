import { Injectable } from '@angular/core';
import { NaturalPeople } from '../models/natural-people.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NaturalPeopleService {

  constructor(private http: HttpClient) { }

  list(): Observable<NaturalPeople[]> {
    return this.http.get<NaturalPeople[]>(`${environment.url_ms_cinema}/natural_peoples`);
  }
  delete(id: number) {
    return this.http.delete<NaturalPeople>(
      `${environment.url_ms_cinema}/natural_peoples/${id}`
    );
  }
  view(id: number): Observable<NaturalPeople> {
    return this.http.get<NaturalPeople>(
      `${environment.url_ms_cinema}/natural_peoples/${id}`
    );
  }
  create(NaturalPeople: NaturalPeople): Observable<NaturalPeople> {
    delete NaturalPeople.id;
    return this.http.post<NaturalPeople>(
      `${environment.url_ms_cinema}/natural_peoples`,
      NaturalPeople
    );
  }
  update(NaturalPeople: NaturalPeople): Observable<NaturalPeople> {
    return this.http.put<NaturalPeople>(
      `${environment.url_ms_cinema}/natural_peoples/${NaturalPeople.id}`,
      NaturalPeople
    );
  }}
