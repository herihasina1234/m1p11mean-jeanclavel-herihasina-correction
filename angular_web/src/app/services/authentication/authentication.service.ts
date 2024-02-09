import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalConstants } from "../global-constants";
import { User } from "src/app/models/User";
import { Router } from "@angular/router";
import { LocalStorageService } from "../local_storage/local-storage.service";
import { Observable } from "rxjs/internal/Observable";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {  
  baseURL: string = GlobalConstants.apiURL + "login";

  constructor(private http: HttpClient, private localStorage: LocalStorageService,
    private route: Router) {
  }

  // login(user: User): Observable<any> {
  //   const headers = { 'content-type': 'application/json' }
  //   const body = { email: user.email, password: user.password };
  //   return this.http.post(this.baseURL, body, { headers: new HttpHeaders() })
  // }

  query_login(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = { email: user.email, password: user.password };
    return this.http.post(this.baseURL, body, { headers: new HttpHeaders() })
  }
  
  login(user: User): void {
    this.query_login(user).subscribe(
      data => {
        this.localStorage.set('token', data.token);
        console.log(data.token);
        this.route.navigate(['/dashboard']);
      },
      err => {
        //add parameter to display the error
        this.route.navigate(['/login']);
      }
    );
  }


}
