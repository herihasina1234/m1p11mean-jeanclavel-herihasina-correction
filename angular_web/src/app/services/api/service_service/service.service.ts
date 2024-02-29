import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../../global-constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from '../../../models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl = GlobalConstants.apiURL + "service";
  private dataListSubject: BehaviorSubject<any[]> = new BehaviorSubject<Service[]>([]);
  private totalPagesSubject: BehaviorSubject<any> = new BehaviorSubject<number>(0);
  private paginationTableSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  
  public dataList$: Observable<Service[]> = this.dataListSubject.asObservable();
  public totalPages$: Observable<number> = this.totalPagesSubject.asObservable();
  public paginationTable$: Observable<number[]> = this.paginationTableSubject.asObservable(); 
  

  constructor(private http: HttpClient) { }

  getAllPaginate(params:any): void {
    const queryParams = Object.keys(params).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');

    this.http.get<Service[]>(`${this.baseUrl}/search?${queryParams}`)
    .subscribe({
        next: (response: any) =>  {
          this.dataListSubject.next(response.data);          
          this.totalPagesSubject.next(response.totalPages)
          this.paginationTableSubject.next(Array.from({length: response.totalPages}, (_, i) => i + 1));
          console.info(response.message);
        }, 
        error: (e: any) => console.error(e),
        complete: () => console.info("getAllPaginate completed succesfully")

      })
  }

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
