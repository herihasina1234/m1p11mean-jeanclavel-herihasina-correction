import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/User";
import { UserService } from "src/app/services/api/user_service/user.service";
import { RoleService } from "src/app/services/api/role_service/role.service";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{
  
  //ui variable

  user = new User;
  pass1: string = '';
  pass2: string = '';
  loading = false;
  alertVisibility = false;
  errorMessage: string | undefined;

  //error boolean variable

  boolname: boolean = false;
  boolfirstname: boolean = false;  
  boolemail: boolean = false;
  boolpass1: boolean = false;
  boolpass2: boolean = false;
  boolpass: boolean = false;
  
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private authenticationService: AuthenticationService
  ) { 
    this.user.name = "Rasamimanana"
    this.user.firstname = "Herihasina"
    this.user.email = "rasamimananaherihasina@gmail.com"
    this.user.password = "herihasina"
    this.initRole("client");            
  }

  ngOnInit(): void {
  }

  initRole(designation: string){
    this.roleService.getByDesignation(designation)
    .subscribe({
      next: (response: any) =>  {        
        this.user.role = response.data;
        console.info(response.message);
      }, 
      error: (e: any) => console.error(e),
      complete: () => console.info("initRole completed succesfully")

    })
  }

  signup(): void {
    if (this.user.name === "") this.boolname = true;
    if (this.user.firstname === "") this.boolfirstname = true;
    if (this.user.email === "") this.boolemail = true;
    if (this.pass1 === "") this.boolpass1 = true;
    if (this.pass2 === "") this.boolpass2 = true;    
    if (!this.boolpass1 && !this.boolpass2 && this.pass1 !== this.pass2) {
      this.boolpass = true;
    }
    
    if (
      !this.boolname && 
      !this.boolfirstname && 
      !this.boolemail && 
      !this.boolpass1 &&
      !this.boolpass2 &&
      !this.boolpass
    ){
      this.user.password = this.pass1;
      this.sign();      
    }
  }

  sign() {  
    this.loading = true; 
    const data = {
      name: this.user.name,
      firstname: this.user.firstname,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role?._id,
      avatar: this.user.firstname
    };
    
    this.userService.create(data)
      .subscribe({
        next: (response: any) =>  {                  
          this.authenticationService.login(this.user);
          console.info(response.message);
        }, 
        error: (e: any) => {
          console.error(e);
          this.errorMessage = e.error.message;
          this.alertVisibility = true;
        },
        complete: () => console.info("sign completed succesfully")
      })
      
  };

}
