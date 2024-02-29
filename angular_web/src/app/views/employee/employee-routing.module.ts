import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { CommissionComponent } from './commission/commission.component';
import { authorizationGuard } from 'src/app/guard/authorization.guard';

const routes:Routes = [
  {
    path: 'appointments',
    component: AppointmentComponent,
    canActivate: [authorizationGuard] 
  },
  {
    path: 'commissions',
    component: CommissionComponent,
    canActivate: [authorizationGuard]   
  }
] 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
