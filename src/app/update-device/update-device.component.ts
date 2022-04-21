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
    description: ''
  });
  @Input() selectedDevice?: Device;

  constructor(private formBuilder: FormBuilder, private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

  update(){
    var div = document.getElementById("container") as HTMLDivElement;
    div.style.visibility = "true";
    div.style.height = "fit-content";
  }

}
