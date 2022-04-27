import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Device } from './device';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'api/devices';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {  }
  
  getDevice(id: number): Observable<Device> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Device>(url).pipe(
      catchError(this.handleError<Device>(`getDevice id=${id}`))
    );
  }

  
  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl).pipe(
      catchError(this.handleError<Device[]>('getDevices', []))
    );
  }

  
  searchDevices(term: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/?description=${term}`).pipe(
      catchError(this.handleError<Device[]>('searchDevices', []))
    );
  }

  addDevice(dev: Device): Observable<Device>{
    return this.http.post<Device>(this.apiUrl, dev, this.httpOptions).pipe(
      catchError(this.handleError<Device>('addDevice'))
    );
  }

  deleteDevice(serialNumber: string): Observable<Device> {
    const url = `${this.apiUrl}/${serialNumber}`;

    return this.http.delete<Device>(url, this.httpOptions).pipe(
      catchError(this.handleError<Device>('deleteDevice'))
    );
  }

  updateDevice(dev: Device): Observable<any> {
    return this.http.put(`${this.apiUrl}/${dev.id}`, dev, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateDevice'))
    );
  }

  getDevicesOfEmployee(emplId: number): Observable<Device[]>{
    return this.http.get<Device[]>(`${this.apiUrl}/?ownerId=${emplId}`).pipe(
      catchError(this.handleError<Device[]>('getDevicesOfEmployee', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


