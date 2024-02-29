import { HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local_storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService {
  constructor(private localStorage: LocalStorageService) { }

  intercept(req: HttpRequest<string>, next: HttpHandler) {
    const token = this.localStorage.get('token');
    if (token) {
      req = req.clone({
        url: req.url,
        setHeaders: {
          Authorization: "Bearer " + token
        }
      });
      
    }
    return next.handle(req);
  }
}
