import { Component, OnInit } from '@angular/core';
import { Device } from '../device';

@Component({
  selector: 'app-view-devices',
  templateUrl: './view-devices.component.html',
  styleUrls: ['./view-devices.component.css']
})
export class ViewDevicesComponent implements OnInit {
  dev: Device = {
    serialNumber: "AE123456BB",
    description: "Xiaomi Redmi Note 9 Pro",
    type: 1,
    ownerId: 1
  };

  constructor() { }

  ngOnInit(): void {
  }

}
