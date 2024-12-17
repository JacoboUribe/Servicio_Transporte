import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  list(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.url_ms_cinema}/departments`);
  }
  delete(id: number) {
    return this.http.delete<Department>(
      `${environment.url_ms_cinema}/departments/${id}`
    );
  }
  view(id: number): Observable<Department> {
    return this.http.get<Department>(
      `${environment.url_ms_cinema}/departments/${id}`
    );
  }
  create(Department: Department): Observable<Department> {
    delete Department.id;
    return this.http.post<Department>(
      `${environment.url_ms_cinema}/departments`,
      Department
    );
  }
  update(Department: Department): Observable<Department> {
    return this.http.put<Department>(
      `${environment.url_ms_cinema}/departments/${Department.id}`,
      Department
    );
  }
}
