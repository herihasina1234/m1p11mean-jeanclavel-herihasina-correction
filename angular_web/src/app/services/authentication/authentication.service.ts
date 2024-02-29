import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GlobalConstants } from "../global-constants";
import { User } from "src/app/models/User";
import { Router } from "@angular/router";
import { LocalStorageService } from "../local_storage/local-storage.service";
import { Observable } from "rxjs/internal/Observable";
import { JWTTokenService } from "../token_service/jwt-token.service";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {  
  baseURL: string = GlobalConstants.apiURL + "login";

  public errorMessage: string | undefined;

  constructor(
    private http: HttpClient, 
    private localStorage: LocalStorageService,
    private route: Router
  ) {}

  query_login(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = { email: user.email, password: user.password };
    return this.http.post(this.baseURL, body, { headers: new HttpHeaders() })
  }
  

  //not in use 
  login(user: User) {    
    this.query_login(user)
    .subscribe({
      next: ( data ) => {
        this.localStorage.set('token', data.token);
        
        if(user.role?.designation === 'client')
          this.route.navigate(['/clients/services']);

        if(user.role?.designation === 'employee')
          this.route.navigate(['/employees/appointments']);
      },
      error: (e: any) => {
        console.error(e)
      },
      complete: () => console.info("login complete successfuly")
    });        
  }

  logout() {
    this.localStorage.remove('token');
    this.route.navigate(['/login']);
  }

}
