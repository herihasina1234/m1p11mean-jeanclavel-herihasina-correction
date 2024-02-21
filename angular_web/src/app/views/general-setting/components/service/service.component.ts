import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../../../models/Service';
import { ServiceService } from '../../../../services/api/service_service/service.service';
import { DataTablesModule } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from '../../modals/add-service/add-service.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, DataTablesModule, MatIconModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  serv: Service[] = [];

  constructor(private serviceService: ServiceService, private dialog: MatDialog) {}

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
  openAddServiceModal(): void {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      width: '500px', // Ajustez la largeur selon vos besoins
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshServiceList(); // Rafraîchir la liste des services après la fermeture du modal
    });
  }


  refreshServiceList(): void {
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
