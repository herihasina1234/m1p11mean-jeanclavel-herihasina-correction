import { Component } from '@angular/core';
import { navItems } from './_nav';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.scss'
})
export class ClientLayoutComponent {
  public navItems = navItems;

  constructor() {}
}
