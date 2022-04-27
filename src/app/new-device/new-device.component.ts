import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {
  serialNumber = new FormControl('', [Validators.required]);
  type = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  constructor( private deviceService: DeviceService, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  createDevice(serialNumber: string, type: string, description: string){
    serialNumber = serialNumber.trim();
    type = type.trim();
    description = description.trim();
    if (serialNumber!=='' && type!=='' && description!==''){
      const dev: Device = {
        serialNumber: serialNumber,
        type: 0,
        description: description,
        ownerId: 0
      };
      if (type.includes('mobile')){
        dev.type = 1;
      }else if (type.includes('tablet')){
        dev.type = 2;
      }else{
        dev.type = 3;
      }
      this.deviceService.addDevice(dev).subscribe((device) => {
        this._snackBar.open('Device '+device.serialNumber+' was succesfully created!', 'X')
      });
    }else{
      this._snackBar.open('You have to insert values for all the fields', 'X')
    }

  }

  getErrorMessageSerialNumber() {
    return 'You must enter a value';
  }
  getErrorMessageType() {
    return 'You must select a value: is the device a mobile, a tablet or a laptop?';
  }
  getErrorMessageDescription() {
    return "You must enter a value, ex. device's brand, model etc.";
  }
}
