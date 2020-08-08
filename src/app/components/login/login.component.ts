import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    debugger
    authService.login().subscribe(data => {
      this.router.navigate(['/home']);
    }, err => {
      console.error(err);
    });
  }
}
