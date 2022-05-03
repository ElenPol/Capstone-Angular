import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  idNum = 200;

  constructor(private employeeService: EmployeeService, private _snackBar: MatSnackBar  ) { }

  ngOnInit(): void {
  }
  
  createEmployee(name: string, email: string){
    name = name.trim();
    email = email.trim();
    if (name!=='' && email!=='' && !this.email.hasError('email')){
      this.idNum++;
      const empl: Employee = {
        id: this.idNum,
        name: name,
        email: email,
        devices: []
      };
      this.employeeService.addEmployee(empl).subscribe((employee) => {
        this._snackBar.open('Employee '+employee.name+' was succesfully created!', 'X')
      });
    }else{
      this._snackBar.open('You have to insert correct values for all the fields', 'X')
    }
  }

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageName() {
    return 'You must enter a value';
  }

}
