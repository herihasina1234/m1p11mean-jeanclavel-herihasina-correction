import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/api/user_service/user.service';
import { GlobalConstants } from 'src/app/services/global-constants';
import { User } from 'src/app/models/User';
import { Employee } from '../../../../models/Employee';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../../modals/employee/add-employee.component';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, DataTablesModule, MatIconModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{
  ListEmp: Employee[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor( private userService: UserService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
      // Add more options as needed
    };
    this.fetchEmployees(); // Appel de la méthode pour récupérer les employés
  }
  
  fetchEmployees(): void {
    this.userService.findByRole(GlobalConstants.emloyeeRole).subscribe(
      (response: any) => {
        this.ListEmp = response.response.data;
        this.dtTrigger.next(null);
        console.log("listEmployee: ", this.ListEmp);
      },
      (error) => {
        console.error('Erreur lors de la récupération des services :', error);
      }
    );
  }
  

  openEmpModal(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '500px',
      height:'400px',
      // Passer isUpdate et le service à votre composant de modal
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchEmployees();
    });
  }

}
