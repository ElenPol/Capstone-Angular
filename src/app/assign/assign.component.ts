import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';
import { Device } from '../device';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../device.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from '../employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';


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
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private deviceService: DeviceService, private employeeService: EmployeeService, private _liveAnnouncer: LiveAnnouncer) {
    
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.dataSource = new MatTableDataSource<Employee>(this.employees);
      this.setTableDetails();
    });
    
  }
  
  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

   setTableDetails() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Employee, filter: string) =>
      data.name.indexOf(filter) != -1 ||
      data.id.toString().indexOf(filter) != -1;
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
