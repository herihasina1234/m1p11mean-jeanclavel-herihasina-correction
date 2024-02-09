import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/User";
import { UserService } from "src/app/services/api/user_service/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{
  
  user = new User;
  pass1: string = '';
  pass2: string = '';

  boolname: boolean = false;
  boolfirstname: boolean = false;  
  boolemail: boolean = false;
  boolpass: boolean = true;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  signup(): void {
    if (this.user.name === "") this.boolname = true;
    if (this.user.firstname === "") this.boolfirstname = true;
    if (this.user.email === "") this.boolemail = true;
    if (this.pass1 === this.pass2) {
      this.boolpass = false;
      this.user.password = this.pass1;
    }
    
    // if (!this.boolname && !this.boolfirstname && !this.boolemail && !this.boolpass) this.sign();
    this.sign();
  }

  sign() {   
    const data = {
      name: this.user.name,
      firstname: this.user.firstname,
      email: this.user.email,
      password: this.user.password
    };
    
    this.userService.create(data)
      .subscribe(
        (response: any) => console.log(response), 
        (error: any) => console.log(error)
      )
  };

}
