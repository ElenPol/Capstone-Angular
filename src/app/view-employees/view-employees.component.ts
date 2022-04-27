import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';
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

  constructor(public employeeService: EmployeeService, private dialog: MatDialog, private _snackBar: MatSnackBar) {  }

  // Push a search term into the observable stream.
  search(term: string): void {
    term = term.trim();
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    
    this.employees$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.employeeService.searchEmployees(term)),
    );
  }

  update(empl: Employee){
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      data: {employee: empl}, });
      dialogRef.afterClosed().subscribe(result => {
        //console.log('The dialog was closed');
        console.log(JSON.stringify(result));
        if (JSON.stringify(result).trim().length !== 0 ){
          this.employeeService.updateEmployee(result).subscribe(() => {
            this._snackBar.open('Employee with id: '+empl.id+' was succesfully updated!', 'X')
          });
        }
      });
  }
  

 

}
