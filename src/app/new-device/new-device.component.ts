import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {
  newDeviceForm = this.formBuilder.group({
    serialNumber: '',
    type: '',
    description: ''
  });
  dev: Device = this.newDeviceForm.value;

  constructor(private formBuilder: FormBuilder, private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

  create(){
     this.dev = this.newDeviceForm.value;
      if (this.newDeviceForm.value.type.includes('mobile')){
        this.dev.type = 1;
      }else if (this.newDeviceForm.value.type.includes('tablet')){
        this.dev.type = 2;
      }else{
        this.dev.type = 3;
      }
      this.dev.ownerId = 0;
      this.deviceService.addDevice(this.dev);

  }
}
