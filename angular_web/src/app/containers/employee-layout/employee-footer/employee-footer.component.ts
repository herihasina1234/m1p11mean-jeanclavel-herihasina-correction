import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-employee-footer',
  templateUrl: './employee-footer.component.html',
  styleUrl: './employee-footer.component.scss'
})
export class EmployeeFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
