import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { EmployeesList } from '../employee-list';
import { DevicesList } from '../device-list';
import { Employee } from '../employee';
import { Device } from '../device';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeviceService } from '../device.service';


@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  employee: Employee | undefined;
  device: Device | undefined;
  myControl = new FormControl('', [Validators.required]);
  myControl2 = new FormControl('', [Validators.required]);
  options: string[] = [];
  options2: string[] = [];
  filteredOptions!: Observable<string[]>;
  filteredOptions2!: Observable<string[]>;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private deviceService: DeviceService) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value2 => this._filter2(value2)),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.options = EmployeesList.map(a => a.id.toString());
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter2(value2: string): string[] {
    const filterValue2 = value2.toLowerCase();
    this.options2 = DevicesList.filter(x => x.ownerId === 0).map(a => a.serialNumber);
    return this.options2.filter(option2 => option2.toLowerCase().includes(filterValue2));
  }

  onSelectEmpl(empl: string){
    this.employee = EmployeesList.find(x => x.id === Number(empl));

  }

  onSelectDev(empl: string){
    this.device = DevicesList.find(x => x.serialNumber === empl);
  }
  
  update(){
    
    if (typeof this.employee!=='undefined' && typeof this.device!=='undefined'){
      this.device.ownerId = this.employee.id;
      console.log(this.device.ownerId);
      if (confirm("Are you sure?")){
        this.deviceService.updateDevice(this.device).subscribe(() => {
          this._snackBar.open('Device '+this.device?.serialNumber+' was succesfully assigned to '+this.employee?.name+'!', 'X')
        });
        
      }
    }else{
      this._snackBar.open('You have to insert values for all the fields', 'X');
    }
    
  }

  openDialog() {
    this.dialog.open(ConfirmationDialog);
  }

  getErrorMessageEmpl() {
    return 'You must enter a value';
  }

  getErrorMessageDev() {
    return 'You must enter a value';
  }
}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {}
