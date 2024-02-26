import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../global-constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountAppointmentDay } from '../../../models/Count_appointment_day';
import { RevenueDay } from '../../../models/Revenue_day';
import { RevenueMonth } from '../../../models/Revenue_month';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  baseUrl = GlobalConstants.apiURL + "appointment";

  constructor(private http: HttpClient) { }

  countAppointmentPerDay(): Observable<CountAppointmentDay[]> {
    return this.http.get<CountAppointmentDay[]>(`${this.baseUrl}/day`);
  }

  countAppointmentPerMonth(): Observable<CountAppointmentDay[]> {
    return this.http.get<CountAppointmentDay[]>(`${this.baseUrl}/month`);
  }

  revenuePerMonth(): Observable<RevenueMonth[]> {
    return this.http.get<RevenueMonth[]>(`${this.baseUrl}/revenue-per-month`);
  }

  revenuePerDay(): Observable<RevenueDay[]> {
    return this.http.get<RevenueDay[]>(`${this.baseUrl}/revenue-per-day`);
  }

}
