import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.css']
})
export class EditEmployeeDialogComponent implements OnInit {
  email = new FormControl('', [Validators.email]);
  emailValue: string;
  nameValue: string;
  empl:Employee;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.empl = data.employee;
      this.emailValue = this.empl.email;
      this.nameValue = this.empl.name;
    }

  ngOnInit(){
  }

  save(){
    const empl: Employee = {
      id: this.empl.id,
      name: this.nameValue,
      email: this.emailValue
    };
    
    this.dialogRef.close(empl);
  }

  getErrorMessageEmail() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  

}
