import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {
  constructor(
    public authService: AuthService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkExpiresToken();
  }
  verifyRenew(exp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let tokenExp = new Date(exp * 1000);
      let now = new Date();
      now.setTime( now.getTime() + (1 * 60 * 60 * 1000));
      // Return the number of milliseconds since 1970/01/01:
      if ( tokenExp.getTime() > now.getTime() ) {
        resolve(true);
      } else {
        this.authService.renewToken()
            .subscribe( () => {
              resolve(true);
            }, () => {
              this.authService.logout();
              reject(false);
            });
      }
    });
  }
  private checkExpiresToken() {
    debugger
    const expiredToken = this.tokenEval(this.authService.expireToken());
    if (expiredToken) {
      this.authService.logout();
      return false;
    }
    return this.verifyRenew(this.authService.expireToken());
  }
  private tokenEval( exp: number ) {
    let now = new Date().getTime() / 1000;
    if (exp < now) {
      return true;
    } else {
      return false;
    }
  }
}
