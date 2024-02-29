import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../local_storage/local-storage.service';
import { User } from 'src/app/models/User';
import { UserService } from '../api/user_service/user.service';

@Injectable({ providedIn: 'root' })
export class JWTTokenService {

  jwtToken!: string;
  decodedToken!: { [key: string]: string; };
  user: User | undefined;

  constructor(private localStorage: LocalStorageService, private userService: UserService) {
    this.setToken(this.localStorage.get('token'))
    
    this.decodeToken()
  }

  setToken(token: string | null) {
    if (token) {
      this.jwtToken = token;
    }
  }

  async decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
      await this.userService.get(this.decodedToken['userId'])
      .subscribe({
        next: (response: any) =>  {
          this.user = response.response.data;                     
          console.info(response.response.message);
        }, 
        error: (e: any) => console.error(e),
        complete: () => console.info("decodeToken complete successfuly")
      })   
    }
  }

  getDecodeToken() {
    return jwtDecode(this.jwtToken);
  }


  getExpiryTime(): string | null {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: string | null = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * +expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
