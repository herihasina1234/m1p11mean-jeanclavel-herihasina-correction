import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local_storage/local-storage.service';
import { JWTTokenService } from '../services/token_service/jwt-token.service';

export const authorizationGuard: CanActivateFn = () => {
  const localStorageService = inject(LocalStorageService);
  const jwtService = inject(JWTTokenService);
  const router = inject(Router);
  
  if (localStorageService.get('token')) {
    jwtService.setToken(localStorageService.get('token')!);
    jwtService.decodeToken();
    console.log(jwtService);

    if (jwtService.isTokenExpired()) {
      router.navigateByUrl('/login');
      return false;
    } 
    return true;
    
  }  
  return false;
  
};
