import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './components/service/service.component';
import { DetailServiceComponent } from './components/detail-service/detail-service.component';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [
  {
    path: 'service',
    component:ServiceComponent
  },
  {
    path: 'service/detail/:id',
    component:DetailServiceComponent
  },
  {
    path: 'employee',
    component:EmployeeComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralSettingRoutingModule { }
