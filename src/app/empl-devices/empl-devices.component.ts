import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Device } from '../device';
import { iconMap } from '../device-icon';
import { DeviceService } from '../device.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-empl-devices',
  templateUrl: './empl-devices.component.html',
  styleUrls: ['./empl-devices.component.css']
})
export class EmplDevicesComponent implements OnInit {
  employee: Employee | undefined;
  devices$!: Observable<Device[]>;
  device: Device[] | undefined;
  
  constructor(private route: ActivatedRoute,
    private deviceService: DeviceService,
    private location: Location) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.devices$ = this.deviceService.getDevicesOfEmployee(id);
  }

  getIcon(dev: Device): string | undefined{
    return iconMap.get(dev.type);
  }

}
