import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { StatService } from 'src/app/services/api/stat/stat.service';
import { RevenueDay } from 'src/app/models/Revenue_day';
import { RevenueMonth } from 'src/app/models/Revenue_month';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [CommonModule,MatTabsModule,MatIconModule, DataTablesModule],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent {
  revenueDay: RevenueDay[] = [];
  revenueMonth: RevenueMonth[] = [];
  dtOptions: DataTables.Settings = {};

  constructor(private statService: StatService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
      // Add more options as needed
    };
    this.getrevenueDay();
    this.getrevenueMonth();
  }

  getrevenueDay(): void {
    this.statService.revenuePerDay().subscribe(
      (response: any) => {
        this.revenueDay = response.response;
        console.log(this.revenueDay);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }

  getrevenueMonth(): void {
    this.statService.revenuePerMonth().subscribe(
      (response: any) => {
        this.revenueMonth = response.response;
        console.log(this.revenueMonth);
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    );
  }
}
