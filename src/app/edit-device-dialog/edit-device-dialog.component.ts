import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-edit-device-dialog',
  templateUrl: './edit-device-dialog.component.html',
  styleUrls: ['./edit-device-dialog.component.css']
})
export class EditDeviceDialogComponent implements OnInit {
  form = this.formBuilder.group({
    serialNumber: '',
    type: '',
    description: '',
    ownerId: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  close(){

  }

  save(){

  }

}
