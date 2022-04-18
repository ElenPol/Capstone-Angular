import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { ViewDevicesComponent } from './view-devices/view-devices.component';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';

const routes: Routes = [{ path: 'initial-page', component: InitialPageComponent },
                        { path: '', redirectTo: '/initial-page', pathMatch: 'full' },
                        { path: 'view-employees', component:  ViewEmployeesComponent},
                        { path: 'view-devices', component: ViewDevicesComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
