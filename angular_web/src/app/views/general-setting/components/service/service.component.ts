import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../../../models/Service';
import { ServiceService } from '../../../../services/api/service_service/service.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  serv: Service[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.getAll().subscribe(
      (response: any) => {
        this.serv = response.response.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des services :', error);
      }
    );
  }
}
