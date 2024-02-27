import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/models/User";
import { GlobalConstants } from "../../global-constants";

@Injectable({ providedIn: 'root' })
export class UserService {
  baseUrl = GlobalConstants.apiURL + "user";

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };
      return this.http.get<User[]>(this.baseUrl, httpOptions);
    } else {
      return this.http.get<User[]>(this.baseUrl);
    }
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
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

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?title=${title}`);
  }
}
