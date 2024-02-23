import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { CountAppointmentDay } from '../../../../models/Count_appointment_day';
import { CountAppointmentMonth } from '../../../../models/Count_appointment_month';
import { StatService } from '../../../../services/api/stat/stat.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-appointment-count',
  standalone: true,
  imports: [CommonModule,MatTabsModule,MatIconModule],
  templateUrl: './appointment-count.component.html',
  styleUrl: './appointment-count.component.scss'
})
export class AppointmentCountComponent implements OnInit {
  countPerDay: CountAppointmentDay[] = [];
  countPerMonth: CountAppointmentMonth[] = [];
  dtOptions: DataTables.Settings = {};

  constructor(private statService: StatService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
      // Add more options as needed
    };
    this.getCountAppDay();
    this.getCountAppMonth();
  }

  getCountAppDay(): void {
    this.statService.countAppointmentPerDay().subscribe(
      (response: any) => {
        this.countPerDay = response.response.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }

  getCountAppMonth(): void {
    this.statService.countAppointmentPerMonth().subscribe(
      (response: any) => {
        this.countPerMonth = response.response.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }
}
