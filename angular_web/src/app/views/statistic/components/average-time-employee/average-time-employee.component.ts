import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AverageTimeEmployee } from '../../../../models/Average_time_employee';
import { AverageTimeEmployeeService } from '../../../../services/api/averageTimeEmployee_service/average-time-employee.service';

@Component({
  selector: 'app-average-time-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './average-time-employee.component.html',
  styleUrl: './average-time-employee.component.scss'
})
export class AverageTimeEmployeeComponent {
  avg: AverageTimeEmployee[] = [];

  constructor(private avgService: AverageTimeEmployeeService) {}

  ngOnInit(): void {
    this.avgService.getAll().subscribe(
      (response: any) => {
        this.avg = response.response.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
    }
}
