import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LocalStorageService } from 'src/app/services/local_storage/local-storage.service';
import { JWTTokenService } from 'src/app/services/token_service/jwt-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  title = 'Login et inscription';

  //ui variable
  loading = false;
  alertVisibility = false;
  errorMessage: string | undefined;
  
  user = new User();
  boolemail: boolean = false;
  boolpass: boolean = false;
  boollogin: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private localStorage: LocalStorageService,
    private route: Router,
    private tokenService: JWTTokenService
  
  ) {
    this.user.email = "rasamimananaherihasina@gmail.com"
    this.user.password = "herihasina"
  }

  ngOnInit() {
  }

  authenticate(): void {
    if (this.user.email === "") this.boolemail = true;
    if (this.user.password === "") this.boolpass = true;
    
    if (!this.boolemail && !this.boolpass) {
      this.loading = true;
      this.authenticationService.query_login(this.user)
      .subscribe({
        next: ( data ) => {
          this.localStorage.set('token', data.token);
          
          if(this.tokenService.user?.role?.designation === 'client')
            this.route.navigate(['/clients/services']);

          if(this.tokenService.user?.role?.designation === 'employee')
            this.route.navigate(['/employees/appointments']);
        },
        error: (e: any) => {
          console.error(e);
          this.loading = false;          
          this.errorMessage = e.error.message;
          this.alertVisibility = true;
        },
        complete: () => console.info("login complete successfuly")
      });    
    }
  }

}
