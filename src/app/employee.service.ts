import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee';
import { map, Observable, of, tap } from 'rxjs';
import { EmployeesList } from './employee-list';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'api/view-employees';

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getEmployees(): Observable<Employee[]> {
    return of(EmployeesList);
  }

  /* GET heroes whose name contains search term */
  searchEmployees(term: string): Observable<Employee[]> {
    return this.getEmployees().pipe(
      map((employees) =>
        employees.filter((emp) =>
          emp.name.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }
}
