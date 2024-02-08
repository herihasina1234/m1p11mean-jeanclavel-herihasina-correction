import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalConstants } from "../global-constants";
import { User } from "src/app/models/User";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {  
  baseURL: string = GlobalConstants.apiURL + "authenticate";

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = { username: user.email, password: user.password };
    return this.http.post(this.baseURL, body, { headers: new HttpHeaders() })
  }
}
