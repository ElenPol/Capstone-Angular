import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';
import { Device } from '../device';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../device.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  displayedColumns = ['id', 'name'];
  employees!: Employee[];
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private deviceService: DeviceService, private employeeService: EmployeeService) {
    
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.dataSource = new MatTableDataSource<Employee>(this.employees);
      console.log(this.dataSource);
    });
    
  }
  
  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
