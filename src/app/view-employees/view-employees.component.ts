import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { DeviceService } from '../device.service';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
import { EmplDevicesComponent } from '../empl-devices/empl-devices.component';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  employees$!: Observable<Employee[]>;
  private searchTerms = new Subject<string>();
  private localTerm: string = "";

  constructor(private employeeService: EmployeeService, private  deviceService: DeviceService, private dialog: MatDialog, private _snackBar: MatSnackBar) {  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.localTerm = term;
    term = term.trim();
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    
    this.employees$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      //distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.employeeService.searchEmployees(term)),
    );
  }

  update(empl: Employee){
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      data: {employee: empl}, });
      dialogRef.afterClosed().subscribe(result => {
        if (typeof result != 'undefined'){
          this.searchTerms.next(this.localTerm);
          this.employeeService.updateEmployee(result).subscribe(() => {
            this._snackBar.open('Employee with id: '+empl.id+' was succesfully updated!', 'X')
          });
        }
      });
  }

  delete(empl: Employee){
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {flagConfDialog: false}, });
      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.searchTerms.next(this.localTerm);
          this.employeeService.deleteEmployee(empl.id).subscribe(() => {
            this._snackBar.open('Employee with id: '+empl.id+' was succesfully deleted!', 'X')
            this.deviceService.getDevicesOfEmployee(empl.id).subscribe((devices) => devices.forEach(d => {
                d.ownerId = 0;
                d.available = true;
                this.deviceService.updateDevice(d).subscribe(()=>console.log(d.ownerId, d.available));
            }));
          });
        }
      });

  }

  showDevices(empl: Employee){
    const dialogRef = this.dialog.open(EmplDevicesComponent, {
      data: {employee: empl}, });
      dialogRef.afterClosed().subscribe(result => {
        if (typeof result != 'undefined'){
            this._snackBar.open('Assign to employee with id: '+result.id+'  was succesfully completed!', 'X')
          };
        }
      );
  }
  

 

}
