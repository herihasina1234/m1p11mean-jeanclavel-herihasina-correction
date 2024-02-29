import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { navItems } from './_nav';

@Component({
  selector: 'app-employee-layout',
  templateUrl: './employee-layout.component.html',
  styleUrl: './employee-layout.component.scss'
})
export class EmployeeLayoutComponent {
  public navItems = navItems;

  constructor() {}
}
