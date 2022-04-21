import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignComponent } from './assign/assign.component';
import { EmplDevicesComponent } from './empl-devices/empl-devices.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { NewDeviceComponent } from './new-device/new-device.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ViewDevicesComponent } from './view-devices/view-devices.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { UpdateDeviceComponent } from './update-device/update-device.component';


const routes: Routes = [{ path: 'initial-page', component: InitialPageComponent },
                        { path: '', redirectTo: '/initial-page', pathMatch: 'full' },
                        { path: 'view-employees', component:  ViewEmployeesComponent},
                        { path: 'view-devices', component: ViewDevicesComponent },
                        { path: 'employee-detail', component: EmployeeDetailComponent },
                        { path: 'empl-devices', component: EmplDevicesComponent },
                        { path: 'new-device', component: NewDeviceComponent },
                        { path: 'new-employee', component: NewEmployeeComponent},
                        { path: 'assign', component: AssignComponent},
                        { path: 'update-device', component: UpdateDeviceComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
