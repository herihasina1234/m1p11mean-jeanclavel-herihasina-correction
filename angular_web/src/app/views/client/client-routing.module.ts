import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesListComponent } from './services-list/services-list.component';
import { PrendreRvComponent } from './prendre-rv/prendre-rv.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { authorizationGuard } from 'src/app/guard/authorization.guard';


const routes:Routes = [
  {
    path: 'services',
    component: ServicesListComponent,
    canActivate: [authorizationGuard]    
  },
  {
    path: 'prendre-rv',
    component: PrendreRvComponent,
    canActivate: [authorizationGuard]    
  },
  {
    path: 'appointment',
    component: AppointmentListComponent,
    canActivate: [authorizationGuard]  
  }
] 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
