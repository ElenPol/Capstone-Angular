import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }
  
  createEmployee(name: string, email: string){
    this.idNum++;
    const empl: Employee = {
      id: this.idNum,
      name: name,
      email: email
    };
    this.employeeService.addEmployee(empl);
    this.employeeService.getEmployees().forEach(values => {console.log(values.map(value => value.name))});
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
