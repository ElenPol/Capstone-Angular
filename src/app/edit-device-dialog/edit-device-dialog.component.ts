import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
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
    description: '',
    ownerId: ''
  });
  dev:Device;
  title: string;
  descriptionValue: string;
  ownerValue: number;
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
      this.descriptionValue = this.dev.description;
      this.ownerValue = this.dev.ownerId;
    }

  ngOnInit(): void {
  }

  save(){
    const dev: Device = {
      id: this.dev.id,
      serialNumber: this.dev.serialNumber,
      type: this.dev.type,
      description: this.descriptionValue,
      ownerId: this.ownerValue
    };
    
    this.dialogRef.close(dev);
    
  }
  
  getIcon(num: number){
    return iconMap.get(num);
  }

}
