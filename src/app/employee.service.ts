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
  private EmplList: Employee[] = [];

  constructor(private http: HttpClient) { }

  
  getEmployee(id: number): Observable<Employee> {
    const empl = EmployeesList.find(h => h.id === id)!;
    return of(empl);
  }

  
  getEmployees(): Observable<Employee[]> {
    return of(EmployeesList);
  }

  
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
