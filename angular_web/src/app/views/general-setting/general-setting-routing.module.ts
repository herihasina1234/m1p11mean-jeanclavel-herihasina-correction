import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './components/service/service.component';
import { DetailServiceComponent } from './components/detail-service/detail-service.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { authorizationGuard } from 'src/app/guard/authorization.guard';

const routes: Routes = [
  {
    path: 'service',
    component:ServiceComponent,
    canActivate: [authorizationGuard]
  },
  {
    path: 'service/detail/:id',
    component:DetailServiceComponent,
    canActivate: [authorizationGuard]

  },
  {
    path: 'employee',
    component:EmployeeComponent,
    canActivate: [authorizationGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralSettingRoutingModule { }
