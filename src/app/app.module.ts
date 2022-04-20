import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { ViewDevicesComponent } from './view-devices/view-devices.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmplDevicesComponent } from './empl-devices/empl-devices.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { NewDeviceComponent } from './new-device/new-device.component';
import { AssignComponent, ConfirmationDialog } from './assign/assign.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    InitialPageComponent,
    ViewEmployeesComponent,
    ViewDevicesComponent,
    EmployeeDetailComponent,
    EmplDevicesComponent,
    NewEmployeeComponent,
    NewDeviceComponent,
    AssignComponent,
    ConfirmationDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }