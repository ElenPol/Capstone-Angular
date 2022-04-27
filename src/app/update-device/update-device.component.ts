import { Component, OnInit, Input  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css']
})
export class UpdateDeviceComponent implements OnInit {
  newDeviceForm = this.formBuilder.group({
    serialNumber: '',
    type: '',
    description: '',
    ownerId: ''
  });
  @Input() selectedDevice?: Device;

  constructor(private formBuilder: FormBuilder, private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

  update(){
    const dev: Device = {
      serialNumber: '',
      type: 0,
      description: '',
      ownerId: 0
    };
    this.deviceService.updateDevice(dev);
  }

}
