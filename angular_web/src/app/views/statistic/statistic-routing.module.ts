import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AverageTimeEmployeeComponent } from './components/average-time-employee/average-time-employee.component';
import { AppointmentCountComponent } from './components/appointment-count/appointment-count.component';

const routes: Routes = [
  {
    path: 'average-time-employee',
    component:AverageTimeEmployeeComponent
  },
  {
    path: 'appointment-count',
    component:AppointmentCountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
