import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { AppointmentComponent } from './appointment/appointment.component'
import { CommissionComponent } from './commission/commission.component'
import { CardModule, ButtonModule, AlertModule, SpinnerModule, ModalModule, FormModule, CollapseModule, AccordionModule, SharedModule } from '@coreui/angular';
import { UtilityModule } from 'src/app/views/utility/utility.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppointmentComponent,
    CommissionComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    CardModule,
    ButtonModule,
    AlertModule,
    UtilityModule,
    SpinnerModule,
    ModalModule,
    FormsModule,
    FormModule,
    CollapseModule,
    AccordionModule,
    SharedModule
  ]
})
export class EmployeeModule { }
