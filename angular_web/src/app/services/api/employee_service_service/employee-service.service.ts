import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../global-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  baseUrl = GlobalConstants.apiURL + "employee-service";

  constructor(private http: HttpClient) { }


  findByService(serviceId:string): Observable<EmployeeServiceService[]> {
    return this.http.get<EmployeeServiceService[]>(`${this.baseUrl}/detail/${serviceId}`);
  }

  create(data: any): Observable<any> {        
    return this.http.post(this.baseUrl, data);
  }

}
