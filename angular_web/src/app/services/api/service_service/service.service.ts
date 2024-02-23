import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../global-constants';
import { Observable } from 'rxjs';
import { Service } from '../../../models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl = GlobalConstants.apiURL + "service";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl);
  }

  getById(id: any): Observable<any> {
    return this.http.get<Service>(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {        
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
