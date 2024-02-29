import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent, ClassToggleService } from '@coreui/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { JWTTokenService } from 'src/app/services/token_service/jwt-token.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrl: './employee-header.component.scss'
})
export class EmployeeHeaderComponent extends HeaderComponent implements OnInit{

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public userInfo: any;
  public avatarUrl: string |undefined;

  constructor(
    private classToggler: ClassToggleService,
    private auth: AuthenticationService,
    private tokenService: JWTTokenService
    ) {
    super();
  }
  ngOnInit(): void {
    this.onInit();
  }

  async onInit(){
    this.userInfo = this.tokenService.getDecodeToken();
    this.avatarUrl = `./assets/img/avatars/${this.userInfo?.avatar}`
  }

  logout() {
    this.auth.logout();
  }
}