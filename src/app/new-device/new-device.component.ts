import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {
  form = this.formBuilder.group({
    serialNumber: ['', [Validators.required]],
    type: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  private static devId = 11;
  constructor( private deviceService: DeviceService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  createDevice(){
    let serialNumber = this.form.value.serialNumber.trim();
    let type = this.form.value.type.trim();
    let description = this.form.value.description.trim();
    if (serialNumber!=='' && type!=='' && description!==''){
      const dev: Device = {
        id: NewDeviceComponent.devId++,
        serialNumber: this.form.value.serialNumber,
        type: 0,
        description: this.form.value.description,
        ownerId: 0
      };
      if (this.form.value.type.includes('mobile')){
        dev.type = 1;
      }else if (this.form.value.type.includes('tablet')){
        dev.type = 2;
      }else{
        dev.type = 3;
      }
      this.deviceService.addDevice(dev).subscribe((device) => {
        console.log(dev.id);
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
