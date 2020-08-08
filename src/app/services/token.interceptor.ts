import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);
    const router = this.injector.get(Router);
    const token = auth.token ? auth.token : '';
    if (request.url.endsWith('token')) {
      return next.handle(request);
    }
    if (!auth.isLoggedIn()) {
      router.navigate(['/login']);
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        // 'Api-Token': token,
        // TODO: Replace following line with an actual Base64 | JWT-based token
        'Authorization': `Bearer ${token}`,
      }
    });
    return next.handle(request);
  }
}
