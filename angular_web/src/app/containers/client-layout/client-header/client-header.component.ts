import { Component, Input, OnInit } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { async } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { JWTTokenService } from 'src/app/services/token_service/jwt-token.service';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrl: './client-header.component.scss'
})
export class ClientHeaderComponent extends HeaderComponent implements OnInit{

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
