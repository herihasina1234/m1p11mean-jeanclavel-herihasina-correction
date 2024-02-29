import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ServicesListComponent } from './services-list/services-list.component';
import { ButtonModule, CardModule, FormModule, GridModule, ModalModule, AccordionModule, SharedModule, PaginationModule, SpinnerModule, AlertModule } from '@coreui/angular';
import { PrendreRvComponent } from 'src/app/views/client/prendre-rv/prendre-rv.component';
import { PaginationComponent } from 'src/app/views/utility/pagination/pagination.component';
import { AppointmentListComponent } from 'src/app/views/client/appointment-list/appointment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { UtilityModule } from 'src/app/views/utility/utility.module';


@NgModule({
  declarations: [
    ServicesListComponent,
    PrendreRvComponent,
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    GridModule,
    CardModule,
    ButtonModule,    
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    AccordionModule,
    SharedModule,
    PaginationModule,
    SpinnerModule,
    IconModule,
    AlertModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    UtilityModule
  ],
  providers:[
    IconSetService
  ]
})
export class ClientModule { }
