import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/Payment';
import { GlobalConstants } from '../../global-constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = GlobalConstants.apiURL + "payments";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {        
    return this.http.post(this.baseUrl, data, { observe: 'response' });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: any): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}?title=${title}`);
  }
}
