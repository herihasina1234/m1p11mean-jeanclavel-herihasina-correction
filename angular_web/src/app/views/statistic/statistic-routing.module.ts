import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AverageTimeEmployeeComponent } from './components/average-time-employee/average-time-employee.component';

const routes: Routes = [
  {
    path: 'average-time-employee',
    component:AverageTimeEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
