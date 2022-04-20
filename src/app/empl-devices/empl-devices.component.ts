import { Component, OnInit } from '@angular/core';
import { Device } from '../device';

@Component({
  selector: 'app-empl-devices',
  templateUrl: './empl-devices.component.html',
  styleUrls: ['./empl-devices.component.css']
})
export class EmplDevicesComponent implements OnInit {
  dev: Device = {serialNumber: "AE1245AE", description: "Xiaomi 11t", type: 1, ownerId: 1};

  constructor() { }

  ngOnInit(): void {
  }

}
