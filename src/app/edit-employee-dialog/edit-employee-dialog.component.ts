import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../employee';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})
export class EditEmployeeDialogComponent implements OnInit {
  email = new FormControl('', [Validators.email, Validators.required]);
  name = new FormControl('', [Validators.required]);
  emailValue: string;
  nameValue: string;
  empl:Employee;

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.empl = data.employee;
      this.emailValue = this.empl.email;
      this.nameValue = this.empl.name;
    }

  ngOnInit(){
  }

  save(){
    let name = this.name.value.trim();
    let email = this.email.value.trim();
    if (name!=='' && email!=='' && !this.email.hasError('email')){
      const empl: Employee = {
        id: this.empl.id,
        name: name,
        email: email,
        devicesId: this.empl.devicesId
      };
      this.dialogRef.close(empl);
    }else{
      this._snackBar.open('You have to insert correct values for all the fields', 'X')
    }
  }

  close(){
    this.dialogRef.close();
  }

  getErrorMessageEmail() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageName() {
    return 'You must enter a value';
  }

  

}
