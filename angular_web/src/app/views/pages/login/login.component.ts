import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LocalStorageService } from 'src/app/services/local_storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  // title = 'Login et inscription';
  
  user = new User;
  boolemail: boolean = false;
  boolpass: boolean = false;
  boollogin: boolean = false;

  constructor(
    private authenticationService: AuthenticationService, private localStorage: LocalStorageService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  authenticate(): void {
    if (this.user.email === "") this.boolemail = true;
    if (this.user.password === "") this.boolpass = true;
    if (!this.boolemail && !this.boolpass) this.login();
  }

  login() {   
    this.authenticationService.login(this.user).subscribe(
      data => {
        this.localStorage.set('token', data.token);
        console.log(data.token);
        this.route.navigate(['/500']);
      },
      err => {
        this.boollogin = true;
        console.log("erreur lors du login :");
        console.log(err);
      }
    );
  }

}
