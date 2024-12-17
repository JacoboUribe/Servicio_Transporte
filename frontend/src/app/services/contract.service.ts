import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contract } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }

  list(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${environment.url_ms_cinema}/contracts`);
  }
  delete(id: number) {
    return this.http.delete<Contract>(
      `${environment.url_ms_cinema}/contracts/${id}`
    );
  }
  view(id: number): Observable<Contract> {
    return this.http.get<Contract>(
      `${environment.url_ms_cinema}/contracts/${id}`
    );
  }
  create(Contract: Contract): Observable<Contract> {
    delete Contract.id;
    return this.http.post<Contract>(
      `${environment.url_ms_cinema}/contracts`,
      Contract
    );
  }
  update(Contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(
      `${environment.url_ms_cinema}/contracts/${Contract.id}`,
      Contract
    );
  }
}
