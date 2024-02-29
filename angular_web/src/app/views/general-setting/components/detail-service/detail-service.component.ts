import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/models/Service';
import { EmployeeServiceService } from '../../../../services/api/employee_service_service/employee-service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/api/user_service/user.service';
import { ServiceService } from 'src/app/services/api/service_service/service.service';
import { AddEmpServiceComponent } from '../../modals/emp-service/add-emp-service/add-emp-service.component';
import { User } from 'src/app/models/User';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-detail-service',
  standalone: true,
  imports: [CommonModule, DataTablesModule],
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.scss']
})
export class DetailServiceComponent implements OnInit {
  serviceId: string | null = null;
  oneService:any = null;
  empService: any = null;
  listServ: Service[] = [];
  listEmp: User[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute,
    private service:ServiceService,
    private emplServ: EmployeeServiceService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
      // Add more options as needed
    };
    if (this.serviceId !== null) { // Vérification si serviceId est différent de null
      this.emplServ.findByService(this.serviceId).subscribe(
        (response: any) => {
          this.empService = response.response.data;
          console.log("services: ", this.empService);
        },
        (error) => {
          console.error('Erreur lors de la récupération des services :', error);
        }
      );
      this.service.getById(this.serviceId).subscribe(
        (response: any) => {
          this.oneService = response.response.data;
          console.log("services: ", this.oneService);
        },
        (error) => {
          console.error('Erreur lors de la récupération des services :', error);
        }
      );
    } else {
      console.error('ID du service non trouvé.');
    }
  }

  openEmpServiceModal(): void {
    const dialogRef = this.dialog.open(AddEmpServiceComponent, {
      width: '500px',
      height:'400px',
      data: { oneService: this.oneService }
      // Passer isUpdate et le service à votre composant de modal
    });
    dialogRef.afterClosed().subscribe(() => {
      // this.refreshServiceList();
    });
  }
}
