import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationModule } from '@coreui/angular';



@NgModule({
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  imports: [
    CommonModule,
    PaginationModule
  ]
})
export class UtilityModule { }
