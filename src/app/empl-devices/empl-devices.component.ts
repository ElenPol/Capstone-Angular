import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Device } from '../device';
import { iconMap } from '../device-icon';
import { DeviceService } from '../device.service';
import { Employee } from '../employee';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-empl-devices',
  templateUrl: './empl-devices.component.html',
  styleUrls: ['./empl-devices.component.css']
})
export class EmplDevicesComponent implements OnInit {
  employee: Employee;
  devicesOfEmployee: Device[] = [];
  availableDevices: Device[] = [];
    
  constructor(private route: ActivatedRoute,
    private deviceService: DeviceService, private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmplDevicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.employee = data.employee;
      this.deviceService.getDevices().subscribe( devices => {
        this.devicesOfEmployee = devices.filter((de) => de.ownerId === this.employee.id);
        this.availableDevices = devices.filter((de) => de.ownerId !== this.employee.id)
      })
    }

  ngOnInit(): void {
    
  }

  getIcon(dev: Device): string | undefined{
    return iconMap.get(dev.type);
  }

  drop(event: CdkDragDrop<Device[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
    }
  }

  save(){
    //update devices of employee information
    this.devicesOfEmployee.forEach(d => { d.ownerId = this.employee.id;
                                        d.available = false;
                                      this.deviceService.updateDevice(d).subscribe()})
    
    //update availiable devices information (those unassigned)
    let devicesNeedToBeUpdated: Device[] = [];
    for (let d of this.employee.devicesId){
      this.availableDevices.filter(dev => dev.id==d).forEach(d => {devicesNeedToBeUpdated.push(d)});
    }
    //console.log(devicesNeedToBeUpdated);
    devicesNeedToBeUpdated.forEach(dev =>{dev.ownerId = 0;
                                          dev.available = true;
                                         this.deviceService.updateDevice(dev).subscribe()});

    //update employee information
    this.employee.devicesId = this.devicesOfEmployee.map(d => d.id);
    this.employeeService.updateEmployee(this.employee).subscribe();
    this.dialogRef.close(this.employee);
  }

  close(){
    this.dialogRef.close();
  }

}
