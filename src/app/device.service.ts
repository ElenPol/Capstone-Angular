import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Device } from './device';
import { map, Observable, of, tap } from 'rxjs';
import devices from './devices.json';



@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'api/view-devices';
  private deviceList: Device[] = [];

  constructor(private http: HttpClient) { 
    for(let x in devices){
      let dev = {
        serialNumber : devices[x]["serialNumber"],
        description : devices[x]["description"],
        type : parseInt(devices[x]["type"]),
        ownerId : parseInt(devices[x]["ownerId"])
      }
      this.deviceList.push(dev);
    }
  }
  
  getDevice(snum: string): Observable<Device> {
    const empl = this.deviceList.find(sn => sn.serialNumber === snum)!;
    return of(empl);
  }

  
  getDevices(): Observable<Device[]> {
    console.log(this.deviceList);
    return of(this.deviceList);
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

  async createDevice(dev: Device){
    //this.deviceList.push(dev);
    var values = JSON.parse(JSON.stringify(devices));
    values[devices.length] = {"serialNumber": "",  "description": "", "type": "", "ownerId": ""}
    values[devices.length].serialNumber = dev.serialNumber;
    values[devices.length].description = dev.description;
    values[devices.length].type = dev.type.toString();
    values[devices.length].ownerId = dev.ownerId.toString();
    console.log(JSON.parse(JSON.stringify(values)));
    
  }

  updateDevice(dev: Device){

  }
}


