import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/api/user_service/user.service';
import { GlobalConstants } from 'src/app/services/global-constants';
import { User } from 'src/app/models/User';
import { Employee } from '../../../../models/Employee';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../../modals/employee/add-employee.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit{
  ListEmp: Employee[] = [];
  
  constructor( private userService: UserService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.fetchEmployees(); // Appel de la méthode pour récupérer les employés
  }
  
  fetchEmployees(): void {
    this.userService.findByRole(GlobalConstants.emloyeeRole).subscribe(
      (response: any) => {
        this.ListEmp = response.response.data;
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
