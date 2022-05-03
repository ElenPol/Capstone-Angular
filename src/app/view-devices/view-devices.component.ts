import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { Device } from '../device';
import { iconMap } from '../device-icon';
import { DeviceService } from '../device.service';
import { EditDeviceDialogComponent } from '../edit-device-dialog/edit-device-dialog.component';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-view-devices',
  templateUrl: './view-devices.component.html',
  styleUrls: ['./view-devices.component.css']
})
export class ViewDevicesComponent implements OnInit {
  devices$!: Observable<Device[]>;
  private searchTerms = new Subject<string>();

  constructor(private deviceService: DeviceService, private employeeService: EmployeeService, private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    term = term.trim();
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.devices$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.deviceService.searchDevices(term)),
    );
  }

  update(dev: Device){
    const dialogRef = this.dialog.open(EditDeviceDialogComponent, {
      data: {device: dev}, });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(JSON.stringify(result));
      if (typeof result != 'undefined'){
        this.deviceService.updateDevice(result).subscribe(() => {
          this._snackBar.open('Device '+dev.serialNumber+' was succesfully updated!', 'X')
        });
      }
    });
    
  }

  getIcon(num: number){
    return iconMap.get(num);
  }

  delete(dev:Device){
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: {flagConfDialog: false}, });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        let flag = result;
        if (flag){
          this.deviceService.deleteDevice(dev.id).subscribe(() => {
            this._snackBar.open('Device '+dev.serialNumber+' was succesfully deleted!', 'X')
            this.employeeService.getEmployees().subscribe(employees => 
                employees.filter(e => e.devicesId.includes(dev.id)).forEach(e =>
                      {e.devicesId.splice(e.devicesId.indexOf(dev.id), 1);
                      this.employeeService.updateEmployee(e)}))
              
          });
        }
      });

  }
}
