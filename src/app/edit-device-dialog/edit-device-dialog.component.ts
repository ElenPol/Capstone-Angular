import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from '../device';
import { iconMap } from '../device-icon';

@Component({
  selector: 'app-edit-device-dialog',
  templateUrl: './edit-device-dialog.component.html',
  styleUrls: ['./edit-device-dialog.component.css']
})
export class EditDeviceDialogComponent implements OnInit {
  form = this.formBuilder.group({
    description: ['', [Validators.required]],
    ownerId: ['', [Validators.required]]
  });
  dev:Device;
  title: string;

  constructor( private formBuilder: FormBuilder,  public dialogRef: MatDialogRef<EditDeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.dev = data.device;
      if (this.dev.type==1){
        this.title = 'Edit Smartphone';
      }else if (this.dev.type==2){
        this.title = 'Edit Tablet';
      }else{
        this.title = 'Edit Laptop';
      }
      this.form.setValue({
        description: this.dev.description,
        ownerId: this.dev.ownerId.toString()
      });
    }

  ngOnInit(): void {
  }

  save(){
    let flag = false;
    if (parseInt(this.form.value.ownerId) == 0){
      flag = true;
    }
    const dev: Device = {
      id: this.dev.id,
      serialNumber: this.dev.serialNumber,
      type: this.dev.type,
      description: this.form.value.description,
      ownerId: parseInt(this.form.value.ownerId),
      available: flag
    };
    
    this.dialogRef.close(dev);
    
  }

  close(){
    this.dialogRef.close();
  }
  
  

}
