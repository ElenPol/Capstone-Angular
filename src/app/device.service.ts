import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Device } from './device';
import { map, Observable, of, tap } from 'rxjs';
import { DevicesList } from './device-list';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'api/view-devices';

  constructor(private http: HttpClient) { }

  
  getDevice(snum: string): Observable<Device> {
    const empl = DevicesList.find(sn => sn.serialNumber === snum)!;
    return of(empl);
  }

  
  getDevices(): Observable<Device[]> {
    return of(DevicesList);
  }

  
  searchDevices(term: string): Observable<Device[]> {
    return this.getDevices().pipe(
      map((devices) =>
        devices.filter((dev) =>
          dev.description.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  updateDevice(dev: Device){

  }

  createDevice(dev: Device){
    DevicesList.push(dev);
    for (let x in DevicesList){
      console.log(x.toString());
    }
  }
}
