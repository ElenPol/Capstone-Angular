import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from '../device';

@Component({
  selector: 'app-edit-device-dialog',
  templateUrl: './edit-device-dialog.component.html',
  styleUrls: ['./edit-device-dialog.component.css']
})
export class EditDeviceDialogComponent implements OnInit {
  form = this.formBuilder.group({
    description: ['', [Validators.required]],
    ownerId: ''
  });
  dev:Device;
  title: string;

  constructor( private formBuilder: FormBuilder,  private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditDeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.form.get('ownerId')?.disable();
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
    if (this.form.value.description.trim()!==''){
      this.dev.description = this.form.value.description;
      this.dialogRef.close(this.dev);
    }else{
      this._snackBar.open('You have to insert values for all the fields', 'X')
    }    
  }

  close(){
    this.dialogRef.close();
  }
  
  getErrorMessageDescription() {
    return 'You must enter a value';
  }

}
