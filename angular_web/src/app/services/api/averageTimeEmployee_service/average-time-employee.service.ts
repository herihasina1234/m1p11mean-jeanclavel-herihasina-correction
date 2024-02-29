import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../global-constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AverageTimeEmployee } from '../../../models/Average_time_employee';

@Injectable({
  providedIn: 'root'
})
export class AverageTimeEmployeeService {

  baseUrl = GlobalConstants.apiURL + "appointment/average-time-by-employee";

  constructor(private http: HttpClient) { }

  getAll(): Observable<AverageTimeEmployee[]> {
    return this.http.get<AverageTimeEmployee[]>(this.baseUrl);
  }

  

}
