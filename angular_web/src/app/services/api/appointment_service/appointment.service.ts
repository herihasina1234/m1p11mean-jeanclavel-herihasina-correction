import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { GlobalConstants } from '../../global-constants';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl = GlobalConstants.apiURL + "appointment";
  
  private dataListSubject: BehaviorSubject<any[]> = new BehaviorSubject<Appointment[]>([]);
  private totalPagesSubject: BehaviorSubject<any> = new BehaviorSubject<number>(0);
  private paginationTableSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  
  public dataList$: Observable<Appointment[]> = this.dataListSubject.asObservable();
  public totalPages$: Observable<number> = this.totalPagesSubject.asObservable();
  public paginationTable$: Observable<number[]> = this.paginationTableSubject.asObservable(); 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {        
    return this.http.post(this.baseUrl, data);
  }

  createMany(data: any): Observable<any> {        
    return this.http.post(`${this.baseUrl}/many`, data, { observe: 'response' });
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

  getBySearchParams(params: any): void {
    const queryParams = Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');

    this.http.get<Appointment[]>(`${this.baseUrl}/search?${queryParams}`).subscribe({
      next: (response: any) =>  {
        this.dataListSubject.next(response.data);
        this.totalPagesSubject.next(response.totalPages)
        this.paginationTableSubject.next(Array.from({length: response.totalPages}, (_, i) => i + 1));
        console.info(response.message);
      }, 
      error: (e: any) => console.error(e),
      complete: () => console.info("getBySearchParams completed succesfully")

    })
  }

  getBySearchParamsEmployee(params: any): void {
    const queryParams = Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');

    this.http.get<Appointment[]>(`${this.baseUrl}/employee_search?${queryParams}`).subscribe({
      next: (response: any) =>  {
        this.dataListSubject.next(response.data);
        this.totalPagesSubject.next(response.totalPages)
        this.paginationTableSubject.next(Array.from({length: response.totalPages}, (_, i) => i + 1));
        console.info(response.message);
      }, 
      error: (e: any) => console.error(e),
      complete: () => console.info("getBySearchParamsEmployee completed succesfully")

    })
  }

  getCommission(params: any): void {
    const queryParams = Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');

    this.http.get<Appointment[]>(`${this.baseUrl}/commission?${queryParams}`).subscribe({
      next: (response: any) =>  {
        this.dataListSubject.next(response.data);
        console.info(response.message);
      }, 
      error: (e: any) => console.error(e),
      complete: () => console.info("getCommission completed succesfully")

    })
  }
}
