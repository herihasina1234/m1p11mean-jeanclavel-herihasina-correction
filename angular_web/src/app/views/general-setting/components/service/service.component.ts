import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../../../models/Service';
import { ServiceService } from '../../../../services/api/service_service/service.service';
import { DataTablesModule } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from '../../modals/add-service/add-service.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, DataTablesModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  serv: Service[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  

  constructor(private serviceService: ServiceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
      // Add more options as needed
    };
    this.serviceService.getAll().subscribe(
      (response: any) => {
        this.serv = response.response.data;
        this.dtTrigger.next(null);
        console.log("services: ", this.serv);
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des services :', error);
      }
    );
  }
  openServiceModal(): void {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      width: '500px',
      height:'400px',
      // Passer isUpdate et le service à votre composant de modal
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshServiceList();
    });
  }


  openUpdateModal(serviceId: string): void {
    const dialogRef = this.dialog.open(AddServiceComponent, {
        width: '500px',
        height:'400px',
        data: { isUpdate: true, serviceId: serviceId }
    });

    dialogRef.afterClosed().subscribe((updatedService: Service) => {
        if (updatedService) {
          console.log("le ho updatena", updatedService);
          
            const index = this.serv.findIndex(s => s._id === updatedService._id);
            if (index !== -1) {
                this.serv[index] = updatedService;
            }
        }
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

  updateService(serviceId: string, newData: any): void {
    this.serviceService.update(serviceId, newData).subscribe(
      () => {
        console.log('Service mis à jour avec succès.');
        this.refreshServiceList();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du service :', error);
      }
    );
  }

  deleteService(serviceId: string): void {
    if (!serviceId) {
      console.error('ID de service invalide:', serviceId);
      return;
    }
    this.serviceService.delete(serviceId).subscribe(
      () => {
        // Suppression réussie, rafraîchissez la liste des services
        this.refreshServiceList();
      },
      (error) => {
        console.error('Erreur lors de la suppression du service :', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
