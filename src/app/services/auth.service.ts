
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  // encodea en base64 un string
  encoded = btoa(environment.clientId + ':' + environment.secretId);
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.loadStorage();
  }
  login(grant_type = 'client_credentials') {
    const body = `grant_type=${grant_type}`;
    return this.http.post(`${environment.epLogin}`, body, {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + this.encoded,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).pipe(
      map((data: any) => {
        this.saveLocalStorage(data);
        return data;
      })
    );
  }
  renewToken() {
    return this.login('refresh_token');
  }
  isLoggedIn() {
    const isLogged = this.token.length > 5;
    if (!isLogged)  {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    localStorage.removeItem('ngspoti-token');
    this.router.navigate(['/login']);
  }
  expireToken(): number {
    return +localStorage.getItem('spotify-exp');
  }
  saveLocalStorage(data): void {
    // agrega a la fecha actual  3600 segundos mas expresados en milisegundos desde 1970/1/1
    const expiresIn = new Date().setSeconds(data.expires_in);
    localStorage.setItem('ngspoti-token', data.access_token);
    localStorage.setItem('spotify-exp', expiresIn.toString());

    this.token = data.access_token;

  }
  private loadStorage(): void {
    if (localStorage.getItem('ngspoti-token')) {
      this.token = localStorage.getItem('ngspoti-token');
    } else {
      this.token = '';
    }
  }
}
