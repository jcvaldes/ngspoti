
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
  encoded = btoa(environment.clientId + ':' + environment.secretId);
  constructor(
    private http: HttpClient
  ) {
    this.loadStorage();
  }
  login() {
    const body = 'grant_type=client_credentials';
    return this.http.post(`${environment.epLogin}`, body, {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + this.encoded,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).pipe(
      map((data: any) => {
        this.saveLocalStorage(data.access_token);
        return data;
      })
    );
  }
  isLoggedIn() {
    const isLogged = this.token.length > 5;
    if (!isLogged)  {
      return false;
    } else {
      return true;
    }
  }
  saveLocalStorage(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }
  private loadStorage(): void {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }
}
