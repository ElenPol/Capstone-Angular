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
import { AssignComponent } from './assign/assign.component';
import { EditDeviceDialogComponent } from './edit-device-dialog/edit-device-dialog.component';
import { EditEmployeeDialogComponent } from './edit-employee-dialog/edit-employee-dialog.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';




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
    EditDeviceDialogComponent,
    EditEmployeeDialogComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),

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
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
