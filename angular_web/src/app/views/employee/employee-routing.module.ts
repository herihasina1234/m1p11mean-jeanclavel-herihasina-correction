import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { CommissionComponent } from './commission/commission.component';

const routes:Routes = [
  {
    path: 'appointments',
    component: AppointmentComponent   
  },
  {
    path: 'commissions',
    component: CommissionComponent   
  }
] 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
