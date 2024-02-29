import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AverageTimeEmployeeComponent } from './components/average-time-employee/average-time-employee.component';
import { AppointmentCountComponent } from './components/appointment-count/appointment-count.component';
import { RevenueComponent } from './components/revenue/revenue.component';
import { authorizationGuard } from 'src/app/guard/authorization.guard';

const routes: Routes = [
  {
    path: 'average-time-employee',
    component:AverageTimeEmployeeComponent,
    canActivate: [authorizationGuard]

  },
  {
    path: 'appointment-count',
    component:AppointmentCountComponent,
    canActivate: [authorizationGuard]

  },
  {
    path: 'revenue',
    component:RevenueComponent,
    canActivate: [authorizationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
